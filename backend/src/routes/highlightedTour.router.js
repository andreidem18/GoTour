const { getAll, create, getOne, remove, update } = require('../controllers/highlightedTour.controllers');
const express = require('express');
const upload = require('../utils/multer');

const highlightedTourRouter = express.Router();

highlightedTourRouter.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

highlightedTourRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.single('image'), update);

module.exports = highlightedTourRouter;