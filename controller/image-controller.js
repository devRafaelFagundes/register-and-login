const Image = require("../model/image")
const uploadToCloudinary3 = require("../helper/cloudinary-helper")
const uploadToCloudinary = require("../helper/cloudinary-helper")

const uploadImage = async (req, res) => {
    try {
        
    if (!req.file) {
        return res.status(400).json({
            success : false,
            message : "please upload a file"
        })
    }
    const {url, publicId} = await uploadToCloudinary(req.file.buffer)

    const createdImage = await Image.create({
        url,
        publicId,
        uploadedBy : req.userInfo.userId
    })

    res.status(201).json({
        success : true,
        message : "image uploaded successfully"
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "something went wrong, try again later"
        })
    }        
}

const fetchImagesController = async (req, res)=>{
    try {
        const idUser = req.userInfo.userId;

        const images = await Image.find({uploadedBy : idUser})
        if (images) {
            res.status(200).json({
                success : true,
                data : images
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "something went wrong"
        })
    }
}
module.exports = {uploadImage, fetchImagesController}