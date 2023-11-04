const catchError = require('../utils/catchError');
const { tourImg: TourImg } = require('../models');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const result = await TourImg.findAll();
    return res.json(result);
});

const create = catchError(async(req, res) => {
    const files = req.files;
    const { tourId } = req.body;
    const uploadedFilesPromises = files.map(file => {
        const { path, filename } = file;
        return uploadToCloudinary(path, filename);
    })
    const uploadedFiles = await Promise.all(uploadedFilesPromises);
    const tourImgsPromises = uploadedFiles.map(file => TourImg.create({
        url: file.url,
        tourId,
    }));
    const tourImgs = await Promise.all(tourImgsPromises);
    return res.status(201).json(tourImgs);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const tourImg = await TourImg.findByPk(id);
    await deleteFromCloudinary(tourImg.url);
    await tourImg.destroy();
    return res.json(tourImg);
})

module.exports = {
    getAll,
    create,
    remove,
}