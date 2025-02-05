const fs = require('fs')
const Media = require('../models/Media')
const {
  uploadImagetoCloudinary,
  uploadVideotoCloudinary,
  deleteImagefromCloudinary,
  deleteVideofromCloudinary
} = require('../helpers/cloudinary-helper')

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded. Select a file to upload"
      })
    } else {
      const { url, public_id, resource_type } = await uploadImagetoCloudinary(req.file.path);

      const newImageUpload = await Media.create({
        url: url,
        public_id: public_id,
        resource_type: resource_type,
        uploaded_by: req.userInfo.userId
      })

      fs.unlinkSync(req.file.path)

      res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: newImageUpload,
      })
    }
  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded. Select a file to upload"
      })
    } else {
      const { url, public_id, resource_type } = await uploadVideotoCloudinary(req.file.path)

      const newVideoUpload = await Media.create({
        url: url,
        public_id: public_id,
        resource_type: resource_type,
        uploaded_by: req.userInfo.userId
      })

      fs.unlinkSync(req.file.path)

      res.status(201).json({
        success: true,
        message: "Video uploaded successfully",
        data: newVideoUpload,
      })

    }

  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}

const fetchImages = async (req, res) => {
  try {

    const images = await Media.find({ resource_type: "image" })

    if (images.length !== 0) {
      res.status(200).json({
        success: true,
        message: "Fetch images successfully",
        data: images
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No image found."
      })
    }

  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}

const fetchVideos = async (req, res) => {
  try {
    const videos = await Media.find({ resource_type: "image" })

    if (videos.length !== 0) {
      res.status(200).json({
        success: true,
        message: "Fetch videos successfully",
        data: videos
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No video file found."
      })
    }


  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}

const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.userInfo.userId

    const image = await Media.findOne({ resource_type: 'image', _id: imageId })

    if (!image) {
      res.status(404).json({
        success: false,
        message: "Image not file found."
      })
    } else {
      if (image.uploaded_by.toString() === userId) {

        const [cloudinaryResult, dbResult] = await Promise.all([
          deleteImagefromCloudinary(image.public_id),
          Media.findByIdAndDelete(imageId)
        ])

        if (cloudinaryResult?.result !== 'ok' && !dbResult) {
          console.error("Caught an error:", deleted)
          res.status(500).json({
            success: false,
            message: "Something went wrong, try again!"
          })
        } else {
          res.status(300).json({
            success: true,
            message: "Image file deleted successfully"
          })

        }

      } else {
        res.status(401).json({
          success: false,
          message: "You're not authorized to delete this file."
        })
      }
    }

  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}

const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.userInfo.userId

    const video = await Media.findOne({ resource_type: 'video', _id: videoId })

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not file found."
      })
    } else {
      if (video.uploaded_by.toString() === userId) {

        const [cloudinaryResult, dbResult] = await Promise.all([
          deleteVideofromCloudinary(video.public_id),
          Media.findByIdAndDelete(videoId)
        ])

        if (cloudinaryResult?.result !== 'ok' && !dbResult) {
          console.error("Caught an error:", deleted)
          res.status(500).json({
            success: false,
            message: "Failed to delete video, try again!"
          })
        } else {
          res.status(300).json({
            success: true,
            message: "Video file deleted successfully"
          })
        }

      } else {
        res.status(401).json({
          success: false,
          message: "You're not authorized to delete this file."
        })
      }
    }



  } catch (error) {
    console.error("Caught an error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error, try again!"
    })
  }
}



module.exports = {
  uploadImage,
  uploadVideo,
  fetchImages,
  fetchVideos,
  deleteImage,
  deleteVideo,
}