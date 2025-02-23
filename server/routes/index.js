const router = require('express').Router();
const apiRoutes = require('./API'); // Import API routes

router.use('/search', apiRoutes);  // Handle /api/search requests

module.exports = router;
