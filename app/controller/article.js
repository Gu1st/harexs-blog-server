'use strict';
const Controller = require('egg').Controller;
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

class ArticleController extends Controller {
  //  得到默认的文章列表
  async index() {
    const ctx = this.ctx;
    const total = await ctx.model.Article.count();
    const { page = 1, count = 7 } = ctx.query;
    const res = await ctx.model.Article.findAll({
      attributes: { exclude: ['content'] },
      offset: (page - 1) * 7,
      limit: count,
      order: [['created_at', 'DESC']]
    });
    ctx.body = {
      code: 200,
      msg: '列表获取成功',
      data: res,
      total
    };
  }
  async indexAndClassify() {
    const ctx = this.ctx;
    const { page = 1, count = 7, cid } = ctx.query;
    const total = await ctx.model.Article.count({
      where: {
        classify_id: {
          [Op.substring]: cid
        }
      }
    });
    const res = await ctx.model.Article.findAll({
      attributes: { exclude: ['content'] },
      offset: (page - 1) * 7,
      limit: count,
      where: {
        classify_id: {
          [Op.substring]: cid
        }
      },
      order: [['created_at', 'DESC']]
    });
    ctx.body = {
      code: 200,
      msg: '列表获取成功',
      data: res,
      total
    };
  }
  async indexAndSearch() {
    const ctx = this.ctx;
    const { page = 1, count = 7, content } = ctx.query;
    const total = await ctx.model.Article.count({
      where: {
        title: {
          [Op.substring]: content
        }
      }
    });
    const res = await ctx.model.Article.findAll({
      attributes: { exclude: ['content'] },
      offset: (page - 1) * 7,
      limit: count,
      where: {
        title: {
          [Op.substring]: content
        }
      },
      order: [['created_at', 'DESC']]
    });
    ctx.body = {
      code: 200,
      msg: '列表获取成功',
      data: res,
      total
    };
  }
  async create() {
    const ctx = this.ctx;
    const { content, desc, title, selectValue, file } = ctx.request.body;

    const tmpAll = [];
    if (selectValue.length > 0) {
      const classify = await ctx.model.Classify.findAll();
      selectValue.forEach(sv => {
        const tmp = classify.filter(item => item.id === sv);
        if (tmp.length) tmpAll.push(tmp[0]);
      });
    }
    //  对分类进行处理把名字和ID单独处理
    let cnameList = '';
    let cidList = '';
    tmpAll.forEach(item => {
      cnameList += item.class_name + ',';
      cidList += item.id + ',';
    });
    cnameList = cnameList.slice(0, cnameList.length - 1);
    cidList = cidList.slice(0, cidList.length - 1);

    const Res = await ctx.model.Article.create({
      id: uuidv4(),
      title,
      desc,
      content,
      head_img: file,
      classify_name: cnameList,
      classify_id: cidList
    });

    ctx.body = {
      code: 200,
      msg: '发表成功',
      data: Res
    };
  }
  async update() {
    const ctx = this.ctx;
    const { id, content, desc, title, selectValue, file } = ctx.request.body;

    const tmpAll = [];
    if (selectValue.length > 0) {
      const classify = await ctx.model.Classify.findAll();
      selectValue.forEach(sv => {
        const tmp = classify.filter(item => item.id === sv);
        if (tmp.length) tmpAll.push(tmp[0]);
      });
    }
    //  对分类进行处理把名字和ID单独处理
    let cnameList = '';
    let cidList = '';
    tmpAll.forEach(item => {
      cnameList += item.class_name + ',';
      cidList += item.id + ',';
    });
    cnameList = cnameList.slice(0, cnameList.length - 1);
    cidList = cidList.slice(0, cidList.length - 1);

    const Res = await ctx.model.Article.update(
      {
        title,
        desc,
        content,
        head_img: file,
        classify_name: cnameList,
        classify_id: cidList
      },
      {
        where: {
          id
        }
      }
    );

    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: Res
    };
  }
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    await ctx.model.Article.destroy({
      where: { id }
    });
    ctx.body = {
      code: 200,
      msg: '删除成功'
    };
  }
  async info() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    const user = await ctx.model.Article.findOne({
      where: {
        id
      }
    });
    if (user) {
      ctx.body = {
        code: 200,
        msg: '获取文章信息成功',
        data: user
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '文章ID不存在',
        data: user
      };
    }
  }
}

module.exports = ArticleController;
