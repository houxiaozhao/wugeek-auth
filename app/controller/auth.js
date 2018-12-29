'use strict';

const Controller = require('./../core/base_controller');
const Sha256 = require('crypto-js/hmac-sha256');

module.exports = class extends Controller {
  async signup() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    this.success(res._id);
  }
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // const res = await service.auth.login(payload);
    const user = await service.user.findByMobile(payload.mobile);
    console.log(user);

    if (
      !user ||
      user.password !==
        Sha256(payload.password + user.salt, ctx.app.config.secret).toString()
    ) {
      this.fail('手机号或密码错误', 400);
    } else {
      this.success({
        userinfo: {
          _id: user._id,
          username: user.username,
          mobile: user.mobile,
          avatar: user.avatar,
        },
        token: await service.token.generate(user),
      });
    }
  }
};
