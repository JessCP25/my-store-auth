const {Strategy} = require('passport-local');
const UserService = require('../../../services/user.service')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UserService();

const localStrategy = new Strategy( {usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if(!user){
      done(boom.unauthorized(), false);
    }
    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
      done(boom.unauthorized(), false);
    }
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;

