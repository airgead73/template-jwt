const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

const checkAuth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery');
const author_controller = require('../controllers/client.authorsController');

router.use(checkAuth);

router
  .route('/')
  .get(
    handleQuery(Author),
    author_controller.view_many
  );

router
  .route('/:authorID')
  .get(
    author_controller.view_one
  );

router
  .route('/:authorID/update')
  .get(
    author_controller.view_update
  );   

module.exports = router;