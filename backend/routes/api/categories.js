const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Category, Fundraiser, Donation, Comment } = require('../../db/models');

const router = express.Router();


const validateCategory = [
 check('categoryName')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Category name must be less than 50 characters.'),
    handleValidationErrors
];


// **** Categories should be Landing??? ****

router.post('/categories', validateCategory, async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        console.error(categoryName)

    const newCategory = await Category.create({
      userId: req.user.id,
      categoryName    
    });

    res.status(201);
    return res.json(newCategory);


    } catch (error) {
      next(e);
    }
});


router.get('/categories', async (req, res, next) => {
  try { 
    const categories = await Category.findAll({
      attributes: ["id", "fundraiserId", "categoryName", "createdAt", "updatedAt"],
    })
    
    return res.json(fundraisers);
  } catch (e) {
    next(e);
}});


router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id,
      {
        include: [
          {
            model: Category,
            attributes: ["id", "fundraiserId", "categoryName", "createdAt", "updatedAt"],
          } 
          // **** include fundraisers in that category?? ****
        ]
      });

    if (!category) {
      const err = new Error("Category couldn't be found");
      err.status = 404;
      return next(err);
    }

    return res.json(category);
  } catch (error) {
    next(error);
  }
});



// Create a Fundraiser based on categoryId
router.post('/:categoryId/fundraiser', requireAuth, async (req, res, next) => {
  try {

    const { categoryId } = req.params;
    const userId = req.user.id;
    const { country, fundName, description, goal, startDate, endDate } = req.body;

    // Find out if the Category exists
    const category = await Category.findByPk(categoryId);

    if (!category) {
      let noResourceError = new Error("Category couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    // If it does exist -> See if the current user made a fundraiser already
    const userFund = await Fundraiser.findOne({
      where: {
        userId: userId
      }
    });

    // if userFund is null -> no Fundraiser already made
    if (!userFund) {
      // Create the new Fundraiser
      const newFund = await Fundraiser.create({ ownerId, categoryId, country, fundName, description, goal, startDate, endDate });
      res.status(200);
      return res.json(newFund);

    } else {
      // Confirm additional new Fundraiser
      let addFundConf = new Message("User already has a Fundraiser for this category, continue?");
      throw addFundConf;
      res.status(200);
      return res.json(newFund);
    }
      
  } catch (error) {
    next(error);
  }
});

// Get Fundraisers belonging to a categoryId
router.get('/:categoryId/fundraisers', async (req, res, next) => {
  try {

    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      const noExistingCatError = new Error("Category couldn't be found");
      noExistingCatError.status = 404;
      throw noExistingCatError;
    }

    const fundraiser = await Fundraiser.findAll({
      where: {
        categoryId: categoryId
      },
      attributes: ['id', 'ownerId', 'country', 'fundName', 'description', 'goal', 'startDate', 'endDate'],
    });

    if (!fundraiser) {
      let noExistingFundError = new Error("Fundraiser couldn't be found");
      noExistingFundError.status = 404;
      throw noExistingFundError;
    }

    return res.status(200).json(fundraiser);
  } catch (error) {
    next(error);
  }
});

// put in fundraiser validations up top!?
//return Fundraisers under category??
router.put('/:categoryId', requireAuth, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user.id;

    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
      const error = new Error("Category couldn't be found");
      error.status = 404;
      throw error;
    }

    if (existingCategory.userId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    const { categoryName } = req.body;

    //keys to edit
    existingcategory.categoryName = categoryName;

    await existingcategory.save();

    return res.status(200).json(existingCategory);
  } catch (error) {
    next(error);
  }
});


//Delete all fundraisers under category, or edit/move to other cat??
router.delete('/:categoryId', requireAuth, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      const err = new Error("Category couldn't be found");
      err.status = 404;
      throw err;
    }

    if (category.userId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    await category.destroy();
    return res.json({ message: "Category successfully deleted" });
  } catch (e) {
    next(e);
  }
});


module.exports = router;

