'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: await bcrypt.hash('admin', saltRounds),
        role: 'admin',
      },
      {
        username: 'user1',
        password: await bcrypt.hash('user1', saltRounds),
        role: 'user',
      },
      {
        username: 'user2',
        password: await bcrypt.hash('user2', saltRounds),
        role: 'user',
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
