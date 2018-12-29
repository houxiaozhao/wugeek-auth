'use strict';
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
const mongoose = require('mongoose');
const _ = require('lodash');
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
    const res = await this.ctx.model.User.find(match, { password: 0, salt: 0 })
      .populate('roles', [ 'alias' ])
      .skip(skip)
      .limit(Number(pageSize))
      .sort(sort)
      .exec();
    count = await this.ctx.model.User.count(match).exec();

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
    const { ctx } = this;
    const salt = rand(256, 36);
    payload.password = Sha256(
      payload.password + salt,
      ctx.app.config.secret
    ).toString();
    payload.salt = salt;
    return ctx.model.User.create(payload);
  }
  /**
   * 获取一个
   * @param {*} _id id
   * @return {*} data
   */
  async show(_id) {
    return this.ctx.model.User.findById(_id);
  }
  /**
   * 删除一个
   * @param {*} _id id
   * @return {*} data
   */
  async destroy(_id) {
    return this.ctx.model.User.findByIdAndRemove(_id);
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload payload
   * @return {*} data
   */
  async update(_id, payload) {
    return this.ctx.model.User.findByIdAndUpdate(_id, payload);
  }

  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile });
  }
  async verificationCan(userid, url, method) {
    const userapi = (await this.ctx.model.User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(userid) },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: '_id',
          as: 'roles',
        },
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'roles.permissions',
          foreignField: '_id',
          as: 'permissions',
        },
      },
      {
        $lookup: {
          from: 'apis',
          localField: 'permissions.apis',
          foreignField: '_id',
          as: 'apis',
        },
      },
      {
        $project: {
          apis: {
            method: 1,
            url: 1,
          },
        },
      },
    ]))[0];
    if (
      _.find(userapi.apis, {
        method,
        url,
      })
    ) {
      return true;
    }
    return false;
  }
};
