const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');

/**
 * @route   GET /users
 * @desc    View users page
 * @access  private
 */
exports.view_many = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.locals.query_results;
  
  res
    .status(200)
    .render('pages/users/index',{
      success,
      count,
      scripts: {
        table_delete: true
      },
      users: data
  });
 
});

/**
 * @route   GET /users/:userID
 * @desc    View user detail
 * @access  private
 */
exports.view_one = asyncHandler(async function(req, res, next) {
  const user = await User.findById(req.params.userID);
  res.status(200).render('pages/users/detail',{
    success: true,
    msg: 'View user detail',
    title: `${user.name}`,
    user
  });
 
});

/**
 * @route   GET /users/:userID/update
 * @desc    View update user form
 * @access  private
 */
exports.view_update = asyncHandler(async function(req, res, next) {
  const user = await User.findById(req.params.userID);
  res.status(200).render('pages/users/update',{
    success: true,
    msg: 'View user detail',
    title: `${user.name}`,
    form_user_update: true,
    user
  });
 
});