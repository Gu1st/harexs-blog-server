'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Comment = app.model.define(
    'comment',
    {
      id: { type: STRING(50), primaryKey: true },
      content: STRING(255),
      name: STRING(50),
      email: STRING(50),
      created_at: DATE,
      updated_at: DATE,
      article_title: STRING(255),
      article_id: STRING(50),
      upper_id: STRING(50),
      status: INTEGER(1)
    },
    {
      tableName: 'comment'
    }
  );

  return Comment;
};
