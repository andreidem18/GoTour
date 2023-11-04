const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const locationRouter = require('./location.router');
const tourRouter = require('./tour.router');
const tourImgRouter = require('./tourImg.router');
const reviewRouter = require('./review.router');
const bookingRouter = require('./booking.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/locations', locationRouter);
router.use('/tours', tourRouter);
router.use('/toursImgs', tourImgRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);

module.exports = router;
