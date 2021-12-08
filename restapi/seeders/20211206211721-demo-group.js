const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [
     {
      id: uuid.v4(),
      name: 'firstt group',
      permissions: ['READ']
     },
     {
      id: uuid.v4(),
      name: 'secondd group',
      permissions: ['READ', 'WRITE']
     }], {});
  },

  down: async (quseryInterface, Sequelize) => {
  }
};
