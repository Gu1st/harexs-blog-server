'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/users')(app);
  require('./router/classify')(app);
  require('./router/article')(app);
  require('./router/upload')(app);
  require('./router/comment')(app);
  require('./router/home')(app);
};
