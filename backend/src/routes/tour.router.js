const { getAll, create, getOne, remove, update, setTourImages, getTourBookings, getTourReview } = require('../controllers/tour.controllers');
const express = require('express');
const isAdmin = require('../utils/isAdmin');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const tourRouter = express.Router();

tourRouter.route('/')
    .get(getAll)
    .post(
        verifyJWT, 
        isAdmin, 
        upload.fields([
            { name: 'imageCover', maxCount: 1 },
            { name: 'tourImgs', maxCount: 50 }
        ]), 
        create
    );

tourRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, isAdmin, remove)
    .put(verifyJWT, isAdmin, upload.single('imageCover'), update);

tourRouter.route('/:id/images')
    .post(verifyJWT, isAdmin, setTourImages);

tourRouter.route('/:id/bookings')
    .get(verifyJWT, isAdmin, getTourBookings);

tourRouter.route('/:id/reviews')
    .get(getTourReview);

module.exports = tourRouter;
