'use strict';
const jwt = require('jwt-simple');
// option, app
module.exports = () => {
  return async function(ctx, next) {
    if (!ctx.headers.authorization) {
      ctx.body = {
        errno: 999,
        errmsg: '需要token',
      };
    } else {
      let payload = null;
      try {
        payload = jwt.decode(
          ctx.headers.authorization.split(' ')[1],
          ctx.app.config.secret
        );
        ctx.state.userid = payload._id;
        const can = await ctx.service.user.verificationCan(
          payload._id,
          ctx.request.url,
          ctx.request.method
        );
        if (can) {
          await next();
        } else {
          ctx.body = {
            errno: 401,
            errmsg: '没有权限',
          };
        }
      } catch (error) {
        ctx.body = {
          errno: 999,
          errmsg: 'token解析失败',
        };
        return false;
      }
    }
  };
};
