'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // app.jwt
  router.post('/user', controller.users.create);
  router.get('/user', controller.users.index);
  router.delete('/user', controller.users.delete);
  router.post('/login', controller.users.login);
  router.post('/verify', controller.users.verify);
};
