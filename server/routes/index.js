const router = require('express').Router();
const apiRoutes = require('./API'); // Import API routes

router.use('/search', apiRoutes);  // Handle /api/search requests

// Catch-all route for wrong paths
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
