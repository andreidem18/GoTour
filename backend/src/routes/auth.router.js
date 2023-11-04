const { signup, login, renew } = require('../controllers/auth.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const authRouter = express.Router();

authRouter.route('/signup')
  .post(upload.single('photo'), signup);

authRouter.route('/login')
  .post(login);

authRouter.route('/renew')
  .get(verifyJWT, renew);

module.exports = authRouter;