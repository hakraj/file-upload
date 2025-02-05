const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { uploadImage, uploadVideo, fetchImages, fetchVideos, deleteImage, deleteVideo } = require("../controllers/media-controller");
const router = express.Router();

// upload image api
router.post('/image', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage)

// upload video api
router.post('/video', authMiddleware, adminMiddleware, uploadMiddleware.single('video'), uploadVideo)

// get images
router.get('/image', authMiddleware, fetchImages)

// get videos
router.get('/video', authMiddleware, fetchVideos)

//delete images
router.delete('/image/:id', authMiddleware, adminMiddleware, deleteImage)

//delete videos
router.delete('/video/:id', authMiddleware, adminMiddleware, deleteVideo)


module.exports = router