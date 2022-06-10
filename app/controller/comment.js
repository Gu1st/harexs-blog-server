'use strict';
const { v4: uuidv4 } = require('uuid');
const Controller = require('egg').Controller;

class CommentController extends Controller {
  //  查 所有评论
  async index() {
    const ctx = this.ctx;
    const res = await ctx.model.Comment.findAll();
    ctx.body = {
      code: 200,
      msg: '列表获取成功',
      data: res
    };
  }
  //  删除评论 如果是一级评论则连带删除二级评论
  async del() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    const res = await ctx.model.Comment.findOne({
      where: {
        id
      }
    });
    //  如果它是顶级评论则连带删除所有子评论
    if (!res.upper_id || res.upper_id === '') {
      await ctx.model.Comment.destroy({
        where: {
          upper_id: id
        }
      });
    }
    //  最后删除自身
    await ctx.model.Comment.destroy({
      where: {
        id
      }
    });
    ctx.body = {
      code: 200,
      msg: '删除成功'
    };
  }
  //  启用评论
  async enable() {
    const ctx = this.ctx;
    const { id, status } = ctx.request.body;
    await ctx.model.Comment.update(
      {
        status: status ? 0 : 1
      },
      {
        where: {
          id
        }
      }
    );
    ctx.body = {
      code: 200,
      msg: '修改成功'
    };
  }
  //    根据文章ID 带出和它有关的 评论
  //    这里根据查出的第一级评论 再去查出 二级评论的数量
  async info() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    //  顶级评论
    const listRes = await ctx.model.Comment.findAll({
      where: {
        article_id: id,
        upper_id: '',
        status: 1
      }
    });
    const countAry = [];
    for (let i = 0; i < listRes.length; i++) {
      const amount = await ctx.model.Comment.count({
        where: {
          upper_id: listRes[i].id,
          status: 1
        }
      });
      countAry[i] = amount;
    }
    //    要查出返回的列表所有的一级评论的子级评论数量
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: listRes,
      countAry
    };
  }
  //  查询它的二级评论
  async children() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    const chilrenRes = await ctx.model.Comment.findAll({
      where: {
        upper_id: id,
        status: 1
      }
    });
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: chilrenRes
    };
  }
  //    发表评论 这还要存储它的文章标题
  async new() {
    const ctx = this.ctx;
    const { content, name, email, articleid, upper_id = '' } = ctx.request.body;
    const articleTitle = await ctx.model.Article.findOne({
      attributes: ['title'],
      where: {
        id: articleid
      }
    });
    await ctx.model.Comment.create({
      id: uuidv4(),
      article_id: articleid,
      name,
      content,
      email,
      upper_id,
      article_title: articleTitle.title,
      status: 0
    });
    ctx.body = {
      code: 200,
      msg: '评论成功'
    };
  }
}

module.exports = CommentController;
