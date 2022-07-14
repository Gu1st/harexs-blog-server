'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Classify = app.model.define(
    'classify',
    {
      id: { type: INTEGER(50), primaryKey: true, autoIncrement: true },
      class_name: STRING(50),
      created_at: DATE,
      updated_at: DATE
    },
    {
      tableName: 'classify'
    }
  );

  return Classify;
};
