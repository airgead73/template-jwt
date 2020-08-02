const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');

const check_auth = require('../middleware/checkAuth');
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');
const samples_controller = require('../controllers/api.sampleController');

// router.use(check_auth);

router  
  .route('/')
  .get(
    handleQuery(Sample),
    samples_controller.read_many
  )
  .post(
    validationRules('createSample'),
    validate,
    samples_controller.create
  )
  .delete(
    samples_controller.delete_collection
  );

router  
  .route('/delete_many')
  .delete(samples_controller.delete_many);

router
  .route('/:sampleID')
  .get(samples_controller.read_one)
  .put(samples_controller.update)
  .delete(samples_controller.delete);

module.exports = router;