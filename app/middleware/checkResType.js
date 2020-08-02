const { ISDEV } = require('../config/config');

const checkResType = function(req, res, next) {
  
  if((req.headers.accept).includes('json')) {
    res.locals.res_json = true;
    res.locals.res_html = false;
  } else {
    res.locals.res_html = true;
    res.locals.res_json = false;
  }

  if(ISDEV) {
    console.log('\n*****************');
    console.log(`res json: ${res.locals.res_json} res html: ${res.locals.res_html}`);
    console.log('*****************\n');
  }

  next();

};

module.exports = checkResType;

