'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, DATE } = app.Sequelize;

  const Article = app.model.define(
    'article',
    {
      id: { type: STRING(50), primaryKey: true },
      title: STRING(100),
      content: TEXT(),
      desc: STRING(100),
      head_img: STRING(100),
      classify_id: STRING(255),
      classify_name: STRING(255),
      created_at: DATE,
      updated_at: DATE,
      comment_num: INTEGER(5)
    },
    {
      tableName: 'article'
    }
  );

  return Article;
};
