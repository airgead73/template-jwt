const asyncHandler = require('../middleware/handleAsync');
const Author = require('../models/Author');

/**
 * @route   GET /users
 * @desc    View users page
 * @access  private
 */
exports.view_many = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.locals.query_results;

  res
    .status(200)
    .render('pages/authors/index',{
      success,
      count,
      authors: data
  });
 
});