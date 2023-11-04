const catchError = require('../utils/catchError');
const { location: Location } = require('../models');

const getAll = catchError(async(req, res) => {
    const results = await Location.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Location.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Location.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Location.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Location.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const getCountries = catchError(async(req, res) => {
    let results = await Location.findAll({ attributes: ['country'], groupBy: 'country'});
    results = results.map(c => c.country)
    return res.json(results
        .filter((item, index) => results.indexOf(item) === index)
    );
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getCountries,
}