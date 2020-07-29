const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

const check_auth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');
const authors_controller = require('../controllers/api.authorsController');

// router.use(check_auth);

router  
  .route('/')
  .get(
    handleQuery(Author),
    authors_controller.read_many
  )
  .post(
    // validationRules('createUser'),
    // validate,
    authors_controller.create
    );

router
  .route('/:authorID')
  .get(authors_controller.read_one)
  .put(authors_controller.update)
  .delete(authors_controller.delete);

module.exports = router;