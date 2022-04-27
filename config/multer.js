const multer = require("multer");
const DataUri = require('datauri')
const path = require('path')

// const dUri = new DataUri()

const fileStorageEngine = multer.memoryStorage();

exports.multerUpload = multer({ storage: fileStorageEngine }).single('image');

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/

exports.dataUri = req => DataUri(path.extname(req.file.originalname).toString(), (obj) => console.log(obj))