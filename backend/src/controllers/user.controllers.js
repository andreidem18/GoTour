const catchError = require('../utils/catchError');
const { user: User } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async (req, res) => {
    const where = req.query;
    // const { role } = req.query;
    // console.log(req);
    // if(role) where.role = role;

    const results = await User.findAll({ where });
    return res.json(results);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const update = {};
    if (req.body.name) update.name = req.body.name;
    let updatedFile = false;
    if (req.file) {
        const { path, filename } = req.file;
        const { url } = await uploadToCloudinary(path, filename);
        update.photo = url;
        updatedFile = true;
    }
    const result = await User.update(
        update,
        { where: { id }, returning: true }
    );
    console.log(result);
    if (result[0] === 0 && !updatedFile) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    getOne,
    remove,
    update
}