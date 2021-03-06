'use strict';
const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.role.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.role.create(payload);
    this.success(res);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.role.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.role.destroy(id);
    this.success(res);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.role.update(id, payload);
    this.success(res);
  }
};
