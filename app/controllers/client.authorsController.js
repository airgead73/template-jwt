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
      scripts: {
        table_delete: true
      },
      authors: data
  });
 
});

/**
 * @route   GET /authors/:authorID
 * @desc    View author detail
 * @access  private
 */
exports.view_one = asyncHandler(async function(req, res, next) {

  const author = await Author.findById(req.params.authorID);

  res.status(200).render('pages/authors/detail',{
    success: true,
    msg: 'View author detail',
    title: `${author.listing}`,
    author
  });
 
});

/**
 * @route   GET /authors/:authorID/update
 * @desc    View update author form
 * @access  private
 */
exports.view_update = asyncHandler(async function(req, res, next) {
  const author = await Author.findById(req.params.authorID);
  res.status(200).render('pages/authors/update',{
    success: true,
    msg: 'View user detail',
    title: `${author.listing}`,
    form_author_update: true,
    author
  });
 
});