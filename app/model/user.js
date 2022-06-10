'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: STRING(50), primaryKey: true },
    username: STRING(30),
    password: {
      type: STRING(50),
      allowNull: false,
    },
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
