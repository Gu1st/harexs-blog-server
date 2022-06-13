'use strict';
const { v4: uuidv4 } = require('uuid');

const Controller = require('egg').Controller;

class ClassifyController extends Controller {
  //  查 所有分类
  async index() {
    const ctx = this.ctx;
    const res = await ctx.model.Classify.findAll({
      order: [['created_at', 'DESC']]
    });
    ctx.body = {
      code: 200,
      msg: '列表获取成功',
      data: res
    };
  }
  //  增 增加分类
  async create() {
    const ctx = this.ctx;
    const { className } = ctx.request.body;
    if (!className) {
      ctx.body = {
        code: 500,
        msg: '分类名称不能为空'
      };
    }
    const classify = await ctx.model.Classify.create({ id: uuidv4(), class_name: className });
    ctx.status = 201;
    ctx.body = {
      code: 200,
      msg: '增加成功',
      data: classify
    };
  }
  //  删
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    await ctx.model.Classify.destroy({
      where: { id }
    });
    ctx.body = {
      code: 200,
      msg: '删除成功'
    };
  }
  //  改
  async modify() {
    const ctx = this.ctx;
    const { id, className } = ctx.request.body;
    // 将所有没有姓氏的人更改为 "Doe"
    await ctx.model.Classify.update(
      { class_name: className },
      {
        where: { id }
      }
    );
    ctx.body = {
      code: 200,
      msg: '修改成功'
    };
  }
}

module.exports = ClassifyController;
