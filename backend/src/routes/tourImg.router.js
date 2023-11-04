const { getAll, create, remove } = require('../controllers/tourImg.controllers');
const express = require('express');
const upload = require('../utils/multer');

const tourImgRouter = express.Router();

tourImgRouter.route('/')
    .get(getAll)
    .post(upload.array('tourImgs'), create);

tourImgRouter.route('/:id')
    .delete(remove)

module.exports = tourImgRouter;