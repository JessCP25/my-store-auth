const boom = require('@hapi/boom');
const UserService = require('./user.service');
const service = new UserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized(), false);
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendEmail(email) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: config.email,
        pass: config.password,
      },
    });
    await transporter.sendMail({
      from: config.email, // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  }
}

module.exports = AuthService;
