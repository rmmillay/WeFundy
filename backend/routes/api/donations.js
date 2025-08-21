const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Category, Fundraiser, Donation, Comment } = require('../../db/models');

const router = express.Router();


const validateDonation = [
 check('donationAmount')
   .exists({ checkFalsy: true })
   .isInt({ min: 1 })
  .withMessage('Donation amount is required'),
  check('message')
    .exists({ checkFalsy: true })
    .withMessage('Message text is required'),
  handleValidationErrors
];


// Add a Message to an existing Donation based on Donation Id
//Route?
//Needed? or just at time of donation??

router.post('/:id/:donationId/message', async (req, res, next) => {
  try{

    const { donationId } = req.params;
    const userId = req.user.id;

    const donation = await Donation.findByPk(donationId);

    if (!donation) {
      let noExistingDonationError = new Error("Donation couldn't be found");
      noExistingDonationError.status = 404;
      throw noExistingDonationError;
    }

    if (donation.userId !== userId) {
      let notUserDonationError = new Error(" This is not your donation");
      notUserDonationError.status = 403;
      throw notUserDonationError;
    }

    const newMessage = await Donation.create({
      donationId,
    });

    return res.status(201).json(newMessage);
  } catch (e) {
    next(e);
  }
});


// get all Donation by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const donations = await Donation.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'email']
        },
        {
          model: Fundraiser,
          attributes: ['id', 'ownerId', 'categoryId', 'country', 'fundName', 'description', 'goal', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        },
      ]
    });

    return res.status(200).json(donation);
  } catch (error) {
    next(error);
  }
});


// Route to update an existing donation
router.put('/:donationId', requireAuth, validateDonation, async (req, res, next) => {
  try {
    const { dontionId } = req.params;
    const { donation, message } = req.body;
    const userId = req.user.id;

    // Find a donation before trying to update it
    const existingDonation = await Donation.findByPk(donationId);

    if (!existingDonation) {
      let noExistingDonationError = new Error("Donatioon couldn't be found");
      noExistingDonationError.status = 404;
      throw noExistingDonationError;
    }

    if (existingDonation.userId !== userId) {
      let notUserDonationError = new Error("Forbidden: This is not your Donation");
      notUserDonationError.status = 403;
      throw notUserDonationError;
    }

    // Editing the keys wanted to update
    existingDonation.donation = donation;
    existingDonation.message = message;
    // Save the changes --- update
    await existingDonation.save();
    //  Add status message
    return res.json(existingDonation);
  } catch (error) {
    next(error);
  }
});


// Route to delete an existing donation
router.delete('/:dontionId', requireAuth, async (req, res, next) => {
  try {
    const { donationId } = req.params;
    const userId = req.user.id;

    // Find a donation before trying to delete it
    const donation = await Donation.findByPk(donationId);

    if (!existingDonation) {
      let noExistingDonationError = new Error("Donation couldn't be found");
      noExistingDonationError.status = 404;
      throw noExistingDonationError;
    }

    if (existingReview.userId !== userId) {
      let notUserDonationError = new Error("Forbidden: This is not your donation");
      notUserDonationError.status = 403;
      throw notUserDonationError;
    }

    // Deletes a review
    await donation.destroy();

    return res.json({ message: 'Successfully deleted' });
    // return res.json(donation);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
 