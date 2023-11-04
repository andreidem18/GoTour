const { getAll, create, getOne, remove, update, getCountries } = require('../controllers/location.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const isAdmin = require('../utils/isAdmin');

const locationRouter = express.Router();

locationRouter.route('/')
    .get(getAll)
    .post(verifyJWT, isAdmin, create);

locationRouter.route('/countries')
    .get(getCountries);
    
locationRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, update)


module.exports = locationRouter;