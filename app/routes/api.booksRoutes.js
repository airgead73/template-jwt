const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const check_auth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');
const books_controller = require('../controllers/api.booksController');

// router.use(check_auth);

router  
  .route('/')
  .get(
    handleQuery(Book, { path: 'author_lead', select: 'listing' }),
    books_controller.read_many
  )
  .post(
    // validationRules('createBook'),
    // validate,
    books_controller.create
  )
  .delete(
    books_controller.delete_collection
  );

router
  .route('/:bookID')
  .get(books_controller.read_one)
  .put(books_controller.update)
  .delete(books_controller.delete);

module.exports = router;