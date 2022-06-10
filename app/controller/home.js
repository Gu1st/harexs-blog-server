'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = 'Hello, This is Gu1st Server By Egg.js!';
  }
  async home() {
    const ctx = this.ctx;
    const articleCount = await ctx.model.Article.count();
    const commentCount = await ctx.model.Classify.count();
    const classifyCount = await ctx.model.Comment.count();
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        articleCount,
        commentCount,
        classifyCount
      }
    };
  }
}

module.exports = HomeController;
