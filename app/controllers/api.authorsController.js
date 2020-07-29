const asyncHandler = require('../middleware/handleAsync');
const Author = require('../models/Author');
const User = require('../models/User');

/**
 * @route   POST /api/authors
 * @desc    Create an author
 * @access  private
 */

 exports.create = asyncHandler(async function(req, res) {

  const { lname, fname, dob, dod } = req.body;

  const author = new Author({
    lname,
    fname,
    dob,
    dod
  });

  await author.save();

  res
    .status(200)
    .json({
      success: true,
      msg: 'Create an author.',
      author
    })

 });

/**
 * @route   GET /api/authors
 * @desc    Get many authors
 * @access  private
 */

exports.read_many = asyncHandler(async function(req, res) {

  res
    .status(200)
    .json({
      success: true,
      msg: 'Read many authors.'
    })

 }); 

/**
 * @route   GET /api/author/:authorID
 * @desc    Get one author
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res) {

  res
    .status(200)
    .json({
      success: true,
      msg: 'Read one author.'
    })

 });
 
 /**
 * @route   PUT /api/author/:authorID
 * @desc    Update an author
 * @access  private
 */

exports.update = asyncHandler(async function(req, res) {

  res
    .status(200)
    .json({
      success: true,
      msg: 'Update an author.'
    })

 }); 

/**
 * @route   DELETE /api/author/:authorID
 * @desc    Delete an author
 * @access  private
 */

exports.delete = asyncHandler(async function(req, res) {

  res
    .status(200)
    .json({
      success: true,
      msg: 'Delete an author.'
    });

 });  

