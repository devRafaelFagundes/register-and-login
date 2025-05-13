const multer = require("multer")

const storage = multer.memoryStorage();

const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image!!'))
    }
}

module.exports = multer({
    storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024
    }
})