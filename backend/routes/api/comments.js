const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Category, Fundraiser, Donation, Comment } = require('../../db/models');

const router = express.Router();



const validateComment = [
  check('message')
  .exists({ checkFalsy: true })
  .withMessage('Comment text is required'),
 handleValidationErrors
];



// get all comments written by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
          include: [
            {
              model: SpotImage,
              attributes: ['url'],
              where: { preview: true },
              required: false
            }
          ]
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });

    return res.json({ Reviews: formattedReviews });
  } catch (error) {
    next(error);
  }
});


// Route to update an existing comment
router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { comment, message } = req.body;
    const userId = req.user.id;

    // Find a comment before trying to update it
    const existingComment = await Comment.findByPk(commentId);

    if (!existingComment) {
      let noExistingCommentError = new Error("Comment couldn't be found");
      noExistingCommentError.status = 404;
      throw noExistingCommentError;
    }

    if (existingComment.userId !== userId) {
      let notUserCommentError = new Error("Forbidden: This is not your comment");
      notUserCommentError.status = 403;
      throw notUserCommentError;
    }

    // Editing the keys that we want to update
    existingComment.message = comment;
    // Save the changes --- update
    await existingComment.save();
    //  Add status message
    return res.json(existingComment);
  } catch (error) {
    next(error);
  }
});


// Route to delete an existing Comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Find a comment before trying to update it
    const comment = await Comment.findByPk(commentId);

    if (!existingComment) {
      let noExistingCommentError = new Error("Comment couldn't be found");
      noExistingCommentError.status = 404;
      throw noExistingCommentError;
    }

    if (existingComment.userId !== userId) {
      let notUserCommentError = new Error("Forbidden: This is not your comment");
      notUserCommentError.status = 403;
      throw notUserCommentError;
    }

    // Deletes a review
    await comment.destroy();

    return res.json({ message: 'Comment successfully deleted' });
    return res.json(comment);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
