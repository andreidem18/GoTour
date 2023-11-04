const catchError = require('../utils/catchError');
const { booking: Booking, tour: Tour, location: Location } = require('../models');

const include = {
    model: Tour,
    attributes: ['id', 'name', 'imageCover', 'price'],
    include: { model: Location, attributes: ['country'] }
}

const getAll = catchError(async (req, res) => {
    const where = {};
    if (req.query.userId) where.userId = req.query.userId;
    const results = await Booking.findAll({ 
        where, 
        include,
        order: [ ['date', 'DESC'] ]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const userId = req.user.id;
    const result = await Booking.create({ ...req.body, userId });
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Booking.findByPk(id, { include });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Booking.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}