'use strict';

module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        if (decode.username === 'gu1st') {
          await next();
        } else {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: '当前用户身份已过期'
          };
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '当前用户身份已过期'
      };
      return;
    }
  };
};
