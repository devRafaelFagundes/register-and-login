const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier")

const uploadToCloudinary = async (buffer) =>{
    return new Promise ((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            (error, result) => {
                resolve({url : result.secure_url, publicId : result.public_id})
            }
        )
        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}

module.exports = uploadToCloudinary;