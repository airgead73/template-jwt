const asyncHandler = require('../middleware/handleAsync');
const Author = require('../models/Author');

/**
 * @route   GET /books
 * @desc    View books page
 * @access  private
 */
exports.view_many = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.locals.query_results;

  const authors = await Author.find();

  res
    .status(200)
    .render('pages/books/index',{
      success,
      count,
      scripts: {
        table_delete: true
      },
      books: data,
      authors
  });
 
});