const asyncHandler = require('../middleware/handleAsync');
const Book = require('../models/Book');
const { dropCollection } = require('../util/db');

/**
 * @route   POST /api/books
 * @desc    Create a book
 * @access  private
 */

 exports.create = asyncHandler(async function(req, res) {

  const { title, edition, date_publication } = req.body;

  const author_lead = req.body.author_lead || req.params.authorID;

  const book = new Book({
    title,
    edition,
    date_publication,
    author_lead
  });

  await book.save();

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/books');
  }

  res
    .status(200)
    .json({
      success: true,
      msg: 'Create a book.',
      book
    })

 });

/**
 * @route   GET /api/books
 * @desc    Get many books
 * @access  private
 */

exports.read_many = asyncHandler(async function(req, res) {

  const { success, count, data } = res.locals.query_results;  

  res
    .status(200)
    .json({
      success,
      msg: 'Read books.',
      count,
      books: data
    })

 }); 

/**
 * @route   GET /api/books/:bookID
 * @desc    Get one book
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res) {

  const book = await Book.findById(req.params.bookID);

  res
    .status(200)
    .json({
      success: true,
      msg: 'Read one book.',
      book
    })

 });
 
 /**
 * @route   PUT /api/author/:authorID
 * @desc    Update an author
 * @access  private
 */

exports.update = asyncHandler(async function(req, res) {
  const { title, edition, author_lead, date_publication } = req.body;

  // Build fields
  const bookFields = {};
  if(title) bookFields.title = title;
  if(edition) bookFields.edition = edition;
  if(author_lead) bookFields.author_lead = author_lead;
  if(date_publication) bookFields.date_publication = date_publication;

  // Find book
  let book = await Book.findById(req.params.bookID);

  if(!book) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: '2: Book not found'
          }
        ]
    });   
  }

  // Update book
  book = await Book.findByIdAndUpdate(req.params.bookID, { $set: bookFields }, { new: true });

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect(`/books/${req.params.bookID}`);
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${book.title} updated.`
  }); 

 }); 

/**
 * @route   DELETE /api/book/:bookID
 * @desc    Delete an author
 * @access  private
 */

exports.delete = asyncHandler(async function(req, res) {

  let book = await Book.findById(req.params.bookID);

  // If book not found
  if(!book) {
    return res.status(404).json({
      success: false,
      errors: [
        {
          msg: '3: Book not found'
        }
      ]
    });   
  }

  // Delete book
  book = await Book.findByIdAndRemove(req.params.bookID);

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/books');
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${book.title} is deleted.`
  }); 

 });  

exports.delete_collection = asyncHandler(async function(req, res) {

  dropCollection('books');

  res
    .status(200)
    .json({
      success: true,
      msg: 'Collection dropped: books'
    });
  
});

