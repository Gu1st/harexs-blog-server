'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const Classify = app.model.define(
    'classify',
    {
      id: { type: STRING(50), primaryKey: true },
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
