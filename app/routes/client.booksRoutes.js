const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const checkAuth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery');
const book_controller = require('../controllers/client.booksController');

router.use(checkAuth);

router
  .route('/')
  .get(
    handleQuery(Book),
    book_controller.view_many
  );

module.exports = router;