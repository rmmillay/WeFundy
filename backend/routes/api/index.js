const router = require('express').Router();
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const { user } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const donationsRouter = require('./donations.js');
const fundraisersRouter = require('./fundraisers.js');
const categoriesRouter = require('./categories.js');
const commentsRouter = require('./comments.js');


//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/donations', donationsRouter);
router.use('/fundraisers', fundraisersRouter);
router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});



module.exports = router;
