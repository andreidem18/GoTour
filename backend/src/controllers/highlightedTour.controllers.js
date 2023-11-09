const catchError = require('../utils/catchError');
const { highlightedTour: HighlightedTour, tour: Tour } = require('../models');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const { Sequelize } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const results = await HighlightedTour.findAll({
        include: [{
            model: Tour,
            attributes: ['id', 'price']
        }],
        order: Sequelize.literal('random()')
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const file = req.file;
    if (file) {
        req.body.image = (await getImageUrl(file)).url;
    }
    const result = await HighlightedTour.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await HighlightedTour.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await HighlightedTour.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const file = req.file;
    const highlighted = await HighlightedTour.findByPk(id);
    if(!highlighted) return res.sendStatus(404);
    if (file) {
        await deleteFromCloudinary(highlighted.image);
        req.body.image = (await getImageUrl(file)).url;
    }
    const result = await HighlightedTour.update(
        req.body,
        { where: {id}, returning: true }
    );
    return res.json(result[1][0]);
});

const getImageUrl = async (file) => {
    const { path, filename } = file;
    return await uploadToCloudinary(path, filename);
}

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}