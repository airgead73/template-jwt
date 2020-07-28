const express = require('express');
const router = express.Router();
const User = require('../models/User');

const check_auth = require('../middleware/checkAuth');
const check_restype = require('../middleware/checkResType');
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation')
const users_controller = require('../controllers/api.usersController');

router.use(check_restype);
router.use(check_auth);

router  
  .route('/')
  .get(
    handleQuery(User),
    users_controller.read_many
  )
  .post(
    validationRules('createUser'),
    validate,
    users_controller.create
    );

router
  .route('/current')
  .get(users_controller.read_current);


router
  .route('/:userID')
  .get(users_controller.read_single)
  .put(users_controller.update)
  .delete(users_controller.delete);

module.exports = router;