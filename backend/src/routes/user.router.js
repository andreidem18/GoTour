const { getAll, getOne, remove, update } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT, getAll)

userRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, upload.single('photo'), update);

module.exports = userRouter;