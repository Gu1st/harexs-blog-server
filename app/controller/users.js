'use strict';
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

const Controller = require('egg').Controller;

class UserController extends Controller {
  //  默认展开所有用户接口
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findAll();
  }
  // 创建用户接口
  async create() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.create({ id: uuidv4(), username, password: md5(password) });
    ctx.status = 201;
    ctx.body = user;
  }
  // 删除用户
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.query.id;
    await ctx.model.User.destroy({
      where: {
        id
      }
    });
    ctx.body = {
      code: 200,
      msg: '删除成功'
    };
  }
  // 登录
  async login() {
    const ctx = this.ctx;
    let { username, password } = ctx.request.body;
    const token = ctx.app.jwt.sign({ username, password }, ctx.app.config.jwt.secret, {
      expiresIn: '120m'
    });

    password = md5(password);
    const user = await ctx.model.User.findOne({
      where: {
        username,
        password
      }
    });
    if (!user) {
      ctx.body = {
        code: 500,
        msg: '用户不存在或密码错误'
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: 'success',
      token,
      data: user
    };
  }
  //  验证token接口
  async verify() {
    const ctx = this.ctx;
    const { token } = ctx.request.body;
    if (!token) {
      ctx.body = {
        code: 500,
        msg: 'token无效'
      };
    }
    const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    ctx.body = {
      code: 200,
      data: decoded
    };
  }
}

module.exports = UserController;
