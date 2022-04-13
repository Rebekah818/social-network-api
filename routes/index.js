const router = require('express').Router();

const userRoutes = require('../routes/api/user-route');
const thoughtRoutes = require('../routes/api/thought-route');

router.use('../../api/thought-route', thoughtRoutes)
router.use('../../api/user-route', userRoutes);

module.exports = router;

