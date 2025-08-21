'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');


let options = {}; 
// options.tableName = 'Users';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = { 
    async up(queryInterface, Sequelize) {
      options.tableName = 'Users';
      //?? return queryInterface.bulkInsert('Users', [
      await User.bulkCreate([
      // return queryInterface.bulkInsert(options, [

        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
          //profileImg: ''
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2'),
          //profileImg: ''
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3'),
          //profileImg: ''
        },
        {
          email: 'user3@user.io',
          username: 'FakeUser3',
          hashedPassword: bcrypt.hashSync('password3'),
          //profileImg: ''
        },
        {
          email: 'user4@user.io',
          username: 'FakeUser4',
          hashedPassword: bcrypt.hashSync('password3'),
          //profileImg: ''
        },
        {
          email: 'user5@user.io',
          username: 'FakeUser5',
          hashedPassword: bcrypt.hashSync('password3'),
          //profileImg: ''
        },
        {
          email: 'user6@user.io',
          username: 'FakeUser6',
          hashedPassword: bcrypt.hashSync('password3'),
          //profileImg: ''
        }


      ], {})
    },


    async down(queryInterface, Sequelize) {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        // username: {[Op.in]: []}
      }, {});
        
      //})
    }
  };
