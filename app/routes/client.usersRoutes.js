const express = require('express');
const router = express.Router();
const User = require('../models/User');

const checkAuth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery')
const user_controller = require('../controllers/client.usersController');

router.use(checkAuth);

router
  .route('/')
  .get(
    handleQuery(User),
    user_controller.view_many
  );

router
  .route('/:userID')
  .get(
    user_controller.view_one
  );

  router
  .route('/:userID/update')
  .get(
    user_controller.view_update
  );  

module.exports = router;
