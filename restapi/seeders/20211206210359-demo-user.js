const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
     {
      id: uuid.v4(),
      login: 'MarkWhite@gmail.com',
      password: 'qwerty12',
      age: 43,
      isDeleted: false
     },
     {
      id: uuid.v4(),
      login: 'FrankBlackwod@gmail.com',
      password: '14545',
      age: 11,
      isDeleted: false
     }], {});
  },

  down: async (quseryInterface, Sequelize) => {
  }
};
