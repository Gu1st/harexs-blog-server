/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    multipart: {
      mode: 'file'
    },
    onerror: {
      html(err, ctx) {
        // html hander
        ctx.body = {
          message: 'error',
          code: 500,
          data: `${err}`
        };
        ctx.status = 500;
      },
      json(err, ctx) {
        // json hander
        ctx.body = { message: 'error', code: 500, data: `${err}` };
        ctx.status = 500;
      }
    },
    jwt: {
      secret: 'gu1st'
    },
    security: {
      csrf: {
        enable: false
      },
      domainWhiteList: []
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,PUT,POST,DELETE,PATCH'
    },
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'root',
      port: 3306,
      database: 'eggapi',
      freezeTableName: true,
      timestamps: true
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1654477002533_9087';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
