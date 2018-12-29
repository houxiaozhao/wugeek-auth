'use strict';
const Service = require('egg').Service;
module.exports = class extends Service {
  async index(payload) {
    const { currentPage = 1, pageSize = 10, search, order } = payload;
    let count = 0;
    const skip = (Number(currentPage) - 1) * Number(pageSize);
    let sort = {};
    const match = {};
    if (search) match.search = { name: { $regex: search } };
    order
      ? (sort[order.substr(0, 1) === '-' ? order.substring(1) : order] =
          order.substr(0, 1) === '-' ? -1 : 1)
      : (sort = { createdAt: -1 });
    const res = await this.ctx.model.Api.find(match)
      .skip(skip)
      .limit(Number(pageSize))
      .sort(sort)
      .exec();
    count = await this.ctx.model.Api.count(match).exec();

    return {
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
      count,
      totalPages: Math.ceil(count / Number(pageSize)),
      res,
    };
  }
  /**
   * 创建一个
   * @param {*} payload payload
   * @return {*} data
   */
  async create(payload) {
    return this.ctx.model.Api.create(payload);
  }
  /**
   * 获取一个
   * @param {*} _id id
   * @return {*} data
   */
  async show(_id) {
    return this.ctx.model.Api.findById(_id);
  }
  /**
   * 删除一个
   * @param {*} _id id
   * @return {*} data
   */
  async destroy(_id) {
    return this.ctx.model.Api.findByIdAndRemove(_id);
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload payload
   * @return {*} data
   */
  async update(_id, payload) {
    return this.ctx.model.Api.findByIdAndUpdate(_id, payload);
  }
};
