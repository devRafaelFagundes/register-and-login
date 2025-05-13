const express = require("express")
const authMiddlware = require("../middlware/authmiddlware")
const imageMiddlware = require("../middlware/image-middlware");
const {uploadImage, fetchImagesController} = require("../controller/image-controller")

const router = express.Router();

router.post("/upload", authMiddlware, imageMiddlware.single('image'), uploadImage);

router.get('/all', authMiddlware, fetchImagesController);

module.exports = router