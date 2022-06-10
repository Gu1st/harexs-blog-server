'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //   const jwt = app.middleware.jwt(app.config.jwt);
  // app.jwt
  router.post('/upload', controller.upload.upload);
};
