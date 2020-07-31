const asyncHandler = require('../middleware/handleAsync');
const Author = require('../models/Author');
const { dropCollection } = require('../util/db');

/**
 * @route   POST /api/authors
 * @desc    Create an author
 * @access  private
 */

 exports.create = asyncHandler(async function(req, res) {

  const { lname, fname, affiliation } = req.body;

  const author = new Author({
    lname,
    fname,
    affiliation
  });

  await author.save();

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/authors');
  }

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

  const { success, count, data } = res.locals.query_results;  

  res
    .status(200)
    .json({
      success,
      msg: 'Read authors.',
      count,
      authors: data
    })

 }); 

/**
 * @route   GET /api/author/:authorID
 * @desc    Get one author
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res) {

  const author = await Author.findById(req.params.authorID);

  res
    .status(200)
    .json({
      success: true,
      msg: 'Read one author.',
      author
    })

 });
 
 /**
 * @route   PUT /api/author/:authorID
 * @desc    Update an author
 * @access  private
 */

exports.update = asyncHandler(async function(req, res) {
  const { lname, fname, affiliation, name_titlepage } = req.body;

  // Build fields
  const authorFields = {};
  if(lname) authorFields.lname = lname;
  if(fname) authorFields.fname = fname;
  if(affiliation) authorFields.affiliation = affiliation;
  if(name_titlepage) authorFields.name_titlepage = name_titlepage;

  console.log(authorFields);

  // Find author
  let author = await Author.findById(req.params.authorID);

  if(!author) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: '2: Author not found'
          }
        ]
    });   
  }

  // Update author
  author = await Author.findByIdAndUpdate(req.params.authorID, { $set: authorFields }, { new: true });

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect(`/authors/${req.params.authorID}`);
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${author.fname} ${author.lname} updated.`
  }); 

 }); 

/**
 * @route   DELETE /api/author/:authorID
 * @desc    Delete an author
 * @access  private
 */

exports.delete = asyncHandler(async function(req, res) {

  let author = await Author.findById(req.params.authorID);

  // If author not found
  if(!author) {
    return res.status(404).json({
      success: false,
      errors: [
        {
          msg: '3: Author not found'
        }
      ]
    });   
  }

  // Delete author
  author = await Author.findByIdAndRemove(req.params.authorID);

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/authors');
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${author.fname} ${author.lname} is deleted.`
  }); 

 });  

exports.delete_many = asyncHandler(async function(req, res) {

  const { ids } = req.body;

  await Author.deleteMany({ _id: {$in: ids }});

  res
    .status(200)
    .json({
      success: true
    });

});

exports.delete_collection = asyncHandler(async function(req, res) {

  dropCollection('authors');

  res
    .status(200)
    .json({
      success: true,
      msg: 'Collection dropped: authors'
    });
  
});

