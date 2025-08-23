const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Category, Fundraiser, Donation, Comment } = require('../../db/models');

const router = express.Router();
 

const validateFundraiser = [
 check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required.'),
 check('fundName')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Fundraiser name must be less than 50 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required.'),
  check('goal')
    .exists({ checkFalsy: true })
    .withMessage('Fundraiser goal must be a positive number.'),
    handleValidationErrors
];


// Goes on Categories!?
// router.post('/', validateFundraiser, async (req, res, next) => {
//     try {
//         const { country, fundName, description, goal } = req.body;
//         console.error(country, fundName, description, goal)

//     const newFund = await Fundraiser.create({
//       ownerId: req.user.id,
//       categoryId: req.category.id,
//       country, fundName, description, goal    
//     });

//     res.status(201);
//     return res.json(newFund);


//     } catch (error) {
//       next(e);
//     }
// });


router.get('/', async (req, res, next) => {
  try { 
    const fundraisers = await Fundraiser.findAll({
      attributes: ["id", "ownerId", "categoryId", "country", "fundName", "description", "goal", "startDate", "endDate" ,"createdAt", "updatedAt"],
      include: [
        { model: Comment },
      ]
    })

    return res.json(fundraisers);
  } catch (e) {
    next(e);
}});


router.get('/:id', async (req, res, next) => { 
  try {
    
    const fundraiser = await Fundraiser.findByPk(req.params.id,
      {
        include: [
          {
            model: User,
            as: 'Owner',
            attributes: ['id', 'userName', 'email']
          }
        ]
      });

    if (!fundraiser) {
      const err = new Error("Fundraiser couldn't be found");
      err.status = 404;
      return next(err);
    }

    return res.json(fundraiser);
  } catch (error) {
    next(error);
  }
});


//Fundraiser by ownerId
router.get('/current', requireAuth, async (req, res, next) => {
  try {

    const ownerId = req.user.id;
    const fundraiser = await Fundraiser.findAll({
      where: {
        ownerId: parseInt(ownerId)
      },

      attributes: ['id', 'ownerId', 'categoryId', 'country', 'fundName', 'description', 'goal', 'startDate', 'endDate'],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'email']
        },
      ]
    });

    if (!fundraiser) {
      let noExistingFundError = new Error("Fundraiser couldn't be found");
      noExistingFundError.status = 404;
      throw noExistingFundError;
    }

    if (Fundraiser.userId !== ownerId) {
      let notUserFundError = new Error("This is not your fundraiser");
      notUserFundError.status = 403;
      throw notUserFundError;
    }

    return res.status(200).json(fundraiser);
  } catch (error) {
    next(error);
  }
});


// Edit a fund
// Complete route /api/fundraisers/:fundraiserId
router.put('/:id', requireAuth, validateFundraiser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingFund = await Fundraiser.findByPk(id);
    if (!existingFund) {
      const error = new Error("Fund couldn't be found");
      error.status = 404;
      throw error;
    }

    if (existingFund.ownerId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    const { country, fundName, description, goal } = req.body;

    existingFund.country = country;
    existingFund.FundName = fundName;
    existingFund.description = description;
    existingFund.goal = goal;

    await existingFund.save();

    return res.status(200).json(existingFund);
  } catch (error) {
    next(error);
  }
});


// Delete a fund
router.delete('/:fundraiserId', requireAuth, async (req, res, next) => {
  try {
    const { fundraiserId } = req.params;
    const userId = req.user.id;
    const fund = await Fundraiser.findByPk(fundraiserId);

    if (!fund) {
      const err = new Error("Fund couldn't be found");
      err.status = 404;
      throw err;
    }

    if (fund.ownerId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    await fund.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (e) {
    next(e);
  }
});



// *** Where put donorId!? ***
//Creating a Donation based on a Fund id
router.post('/:id/donations', requireAuth, async (req, res, next) => {
  try {
    // How do I grab the fundraiser id that was used on postman:
    // req.params is an object of parameters
    // This is one way to grab it:
    // const fundraiserId = req.params.fundraiserId
    const { fundraiserId } = req.params;
    const userId = req.user.id;
    const { donationAmount, message } = req.body;

    // Find out if the Fund exists
    const fundraiser = await Fundraiser.findByPk(fundraiserId);

    if (!fundraiser) {
      let noResourceError = new Error("Fund couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    // If it does exist -> See if the current user made a donation already]
    const userDonation = await Donation.findOne({
      where: {
        userId: userId
      }
    });

    // if userDonation is null (no existing donation)
    if (!userDonation) {
      // Create the new Donation
      const newDonation = await Donation.create({ userId, fundraiserId, donationAmount, message });

    } else {
      let alreadyDonatedError = new Error("User has already donated for this fundraiser");
      alreadyDonatedError.status = 500;
      throw alreadyDonatedError;
    }

    return res.status(200).json(newDonation);
  } catch (error) {
    next(error);
  }
})


// ** Fix? **
// Add a Comment to a fundraiser based on fund Id
router.post('/:id/comment', requireAuth, async (req, res, next) => {
  try {

    const fundraiserId = req.params.id;
    const { message, } = req.body;
    const fund = await Fundraiser.findByPk(fundraiserId);

    if (fundraiser !== null) {
      const invalidFundId = new Error("Fundraiser couldn't be found");
      invalidFundId.status = 404;
      throw invalidFundId;
    }
    const newComment = await Comment.create({
      fundraiserId: parseInt(fundraiserId),
    
    });
    return res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});


// Get all Donations by FundraiserId
router.get('/:id/donations', async (req, res, next) => {
  try {
    const fundraiserId = req.params.id;

    const fundraiser = await Fundraiser.findByPk(fundraiserId);
    if (!fundraiser) {
      const noResourceError = new Error("Fundraiser couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    const donations = await Donation.findAll({
      where: {
        fundraiserId: fundraiserId
      },
      attributes: ['id', 'userId', 'fundraiserId', 'donationAmount','message'],
    });

    // return res.json({ Donations: donations });
    return res.json(Donation);
  } catch (error) {
    next(error);
  }
});


// Get all Comments by FundraiserId
router.get('/:id/comments', async (req, res, next) => {
  try {

    const fundraiserId = req.params.id;

    const fundraiser = await Fundraiser.findByPk(fundraiserId);
    if (!fundraiser) {
      const noResourceError = new Error("Fundraiser couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    const comments = await Comment.findAll({
       where: {
        fundraiserId: fundraiserId
      },
          attributes: ['id', 'ownerId','categoryId', 'country','fundName', "description", "goal", "startDate", "endDate" ,"createdAt", "updatedAt"],

    });

    return res.json(Donation);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
