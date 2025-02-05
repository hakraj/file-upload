const express = require("express");
const router = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { uploadImage } = require("../controllers/media-controller");

router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to admin page",
  })
})


module.exports = router