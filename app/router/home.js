'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //   const jwt = app.middleware.jwt(app.config.jwt);
  // app.jwt
  router.get('/', controller.home.index);
  router.get('/home', controller.home.home);
};
