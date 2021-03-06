const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const validationRules = (method) => {

  switch(method) {
    case 'createUser':
      return [
        body('name', 'Name is required.').not().isEmpty().trim().escape(),
        body('email', 'Enter a valid email.').isEmail().normalizeEmail().custom(async (value, {req}) => {
          let user = await User.findOne({ email: value });
          if(user) {
            throw new Error('User already exists.')
          }
          return true;
        }),
        body('password', 'Password should more than 5 characters and less than 17 characters.').isLength({ min: 6 , max: 16 }),
        body('confirm_password').custom((value, {req}) => {
          if(value !== req.body.password) {
            throw new Error('Password confirmation does not match.')
          }
          return true;
        }) 
      ];
      break; 
    case 'createAuthor':
      return [
        body('fname', 'Enter first name.').not().isEmpty().trim().escape(),
        body('lname', 'Enter last name').not().isEmpty().trim().escape(),
        body('affiliation').optional()
      ];
      break;
    case 'createSample':
      return [
        body('name', 'Provide valid entry').not().isEmpty().isLength({ max: 100 }).trim().escape(),
        body('status', "Status should be 'active' or 'inactive'.").not().isEmpty().matches(/\b(?:active|inactive)\b/),
        body('desc', 'Description should be less than 100 characters').optional().isLength({ max: 100 }),
        body('due', 'Provide valid entry').optional()
      ];
      break;
    case 'signinUser':
      return [
        body('email', 'Enter valid email.').isEmail().normalizeEmail(),
        body('password', 'Enter a valid password.').isLength({ min: 6 , max: 16 })
      ]      
  }
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];  
  errors.array().map(err => extractedErrors.push(err.msg));

  if(res.locals.res_json) {
    return res
      .status(404)
      .json({
        success: false,
        errors: extractedErrors
      });
  }

  res.locals.error_arr = extractedErrors;
  res.locals.validation_fail = true;
  return next();

}

module.exports = {
  validationRules,
  validate
}