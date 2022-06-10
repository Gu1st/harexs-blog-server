'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  // app.jwt
  router.get('/comment', jwt, controller.comment.index);
  router.get('/blog/comment', controller.comment.info);
  router.post('/comment', controller.comment.new);
  router.get('/comment/children', controller.comment.children);
  router.patch('/comment/enbale', controller.comment.enable);
  router.delete('/comment', controller.comment.del);
};
