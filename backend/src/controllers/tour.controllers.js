const catchError = require('../utils/catchError');
const { 
    tour: Tour, 
    tourImg: TourImg, 
    user: User, 
    location: Location, 
    booking: Booking, 
    review: Review 
} = require('../models');
const sequelize = require('sequelize');
const { Op } = require("sequelize");
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');



const getAll = catchError(async(req, res) => {

    const getQueries = queries => {
        const mainWhere = {}
        const locationWhere = {}
        if(queries.name) mainWhere.name = {[Op.iLike]: `%${queries.name}%`}
        if(queries.price) {
            mainWhere.price = {[Op.between]: queries.price.split(',')}
        }
        if(queries.country) locationWhere.country = queries.country;
        return {mainWhere, locationWhere };
    }
    
    const { mainWhere, locationWhere } = getQueries(req.query);
    const results = await Tour.findAll({ 
        attributes: { include: [[sequelize.fn('avg', sequelize.col('reviews.rating')), 'avgReviews']]},
        include: [
            { model: Review, attributes: []}, 
            { model: Location, where: locationWhere }
        ],
        group: ['tour.id', 'location.id'],
        where: mainWhere,
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const getTourImgs = async (tourId) => {
        const files = req.files['tourImgs'];
        if(!files) return;
        const uploadedFilesPromises = files.map(file => {
            const { path, filename } = file;
            return uploadToCloudinary(path, filename);
        })
        const uploadedFiles = await Promise.all(uploadedFilesPromises);
        const tourImgs = uploadedFiles.map(file => TourImg.create({
            url: file.url,
            tourId
        }))
        return await Promise.all(tourImgs);
    }
    const { url: imageCover } = await getImageCoverUrl(req.files['imageCover'][0]);
    const result = await Tour.create({...req.body, imageCover});
    await getTourImgs(result.id);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Tour.findByPk(id, { include: [TourImg, User, Location, Review] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Tour.destroy({ where: {id}, individualHooks: true });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if (!tour) return res.sendStatus(404);
    const imageCover = req.file;
    if (imageCover) {
        await deleteFromCloudinary(tour.imageCover);
        req.body.imageCover = (await getImageCoverUrl(imageCover)).url;
    }
    const result = await Tour.update(
        req.body,
        { where: {id}, returning: true }
    );
    return res.json(result[1][0]);
});

const setTourImages = catchError(async(req, res) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    await tour.setTourImgs(req.body);
    const images = await tour.getTourImgs();
    return res.json(images);
})

const getTourBookings = catchError(async(req, res) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if(!tour) return res.status(404).json({ message: "tour does not exists"});
    const bookings = await Booking.findAll({ 
        where: { tourId: id },
        include: [ User ],
    });
    return res.json(bookings);
})
const getTourReview = catchError(async(req, res) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if(!tour) return res.status(404).json({ message: "tour does not exists"});
    const reviews = await Review.findAll({ 
        where: { tourId: id },
        include: [ User ],
    });
    return res.json(reviews);
})

const getImageCoverUrl = async (file) => {
    const { path, filename } = file;
    return await uploadToCloudinary(path, filename);
}

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setTourImages,
    getTourBookings,
    getTourReview,
}