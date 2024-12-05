const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('./../services/auth.service');
const service = new AuthService()

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user =req.user;
      const response = service.signToken(user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const {email} =req.body;
      const response = await service.sendEmail(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
