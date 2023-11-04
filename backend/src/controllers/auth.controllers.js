const catchError = require('../utils/catchError');
const { user: User } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = catchError(async(req, res) => {
  const { name, email, password, role='user' } = req.body;
  const { path, filename } = req.file;
  const { url } = await uploadToCloudinary(path, filename);
  const result = await User.create({ 
    name, 
    email, 
    password,
    role,
    photo: url
  })
  return res.json(result);
});

const login = catchError(async(req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ where: { email } });
  if(!userFound) return res.status(401).json({ message: 'Invalid credentials' });
  const isValid = await bcrypt.compare(password, userFound.password);
  if(!isValid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign(
    { id: userFound.id },
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' }
  )
  return res.json({ user: userFound, token });
});

const renew = catchError(async(req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' }
  )
  return res.json({user, token});
})

module.exports = {
    signup,
    login,
    renew
}