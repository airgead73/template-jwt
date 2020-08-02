const asyncHandler = require('../middleware/handleAsync');
const Sample = require('../models/Sample');
const { dropCollection } = require('../util/db');

/**
 * @route   POST /api/samples
 * @desc    Create a sample
 * @access  private
 */

exports.create = asyncHandler(async function(req, res) {

  const { name, status, desc, due } = req.body;

  const sample = new Sample({
    name,
    status,
    desc,
    due
  });

  await sample.save();

  if(res.locals.res_json) {
    return res
    .status(200)
    .json({
      success: true,
      msg: 'Create an sample.',
      sample
    });
  }  

  res
    .status(200)
    .redirect('/samples');

 });

 /**
 * @route   GET /api/samples
 * @desc    Get many samples
 * @access  private
 */

exports.read_many = asyncHandler(async function(req, res) {

  const { success, count, data } = res.locals.query_results;  

  res
    .status(200)
    .json({
      success,
      msg: 'Read samples.',
      count,
      samples: data
    })

 }); 

 /**
 * @route   GET /api/sample/:sampleID
 * @desc    Get one sample
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res) {

  const sample = await Sample.findById(req.params.sampleID);

  res
    .status(200)
    .json({
      success: true,
      msg: 'Read one sample.',
      sample
    })

 });

  /**
 * @route   PUT /api/sample/:sampleID
 * @desc    Update an sample
 * @access  private
 */

exports.update = asyncHandler(async function(req, res) {
  const { name, status, desc, due } = req.body;

  // Build fields
  const sampleFields = {};
  if(name) sampleFields.name = name;
  if(status) sampleFields.status = status;
  if(desc) sampleFields.desc = desc;
  if(due) sampleFields.due = due;

  // Find sample
  let sample = await Sample.findById(req.params.sampleID);

  if(!sample) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: '2: sample not found'
          }
        ]
    });   
  }

  // Update sample
  sample = await Sample.findByIdAndUpdate(req.params.sampleID, { $set: sampleFields }, { new: true });

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect(`/samples/${req.params.sampleID}`);
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${sample.fname} ${sample.lname} updated.`
  }); 

 }); 

 /**
 * @route   DELETE /api/author/:authorID
 * @desc    Delete an author
 * @access  private
 */

exports.delete = asyncHandler(async function(req, res) {

  let sample = await Sample.findById(req.params.sampleID);

  // If sample not found
  if(!sample) {
    return res.status(404).json({
      success: false,
      errors: [
        {
          msg: '3: sample not found'
        }
      ]
    });   
  }

  // Delete sample
  sample = await Sample.findByIdAndRemove(req.params.sampleID);

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/samples');
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${sample.name} is deleted.`
  }); 

 });  

 exports.delete_many = asyncHandler(async function(req, res) {

  const { ids } = req.body;

  await Sample.deleteMany({ _id: {$in: ids }});

  res
    .status(200)
    .json({
      success: true
    });

});

exports.delete_collection = asyncHandler(async function(req, res) {

  dropCollection('samples');

  res
    .status(200)
    .json({
      success: true,
      msg: 'Collection dropped: samples'
    });
  
});