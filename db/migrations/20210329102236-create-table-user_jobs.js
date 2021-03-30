'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    return queryInterface.createTable('user_jobs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'jobs',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_jobs');
  }
};
