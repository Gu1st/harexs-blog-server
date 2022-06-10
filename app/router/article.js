'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  // app.jwt
  router.get('/article', jwt, controller.article.index);
  router.post('/article', jwt, controller.article.create);
  router.delete('/article', jwt, controller.article.delete);
  router.get('/article/info', controller.article.info);
  router.put('/article', jwt, controller.article.update);
  router.get('/article/classify', controller.article.indexAndClassify);
  router.get('/article/search', controller.article.indexAndSearch);
  router.get('/blog/article', controller.article.index);
};
