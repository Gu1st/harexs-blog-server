'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  // app.jwt
  router.get('/classify', jwt, controller.classify.index);
  router.post('/classify', jwt, controller.classify.create);
  router.delete('/classify', jwt, controller.classify.delete);
  router.put('/classify', jwt, controller.classify.modify);
};
