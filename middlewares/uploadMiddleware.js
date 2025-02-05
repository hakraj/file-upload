const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueFileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, uniqueFileName)
  }
})

// file filter
const checkFile = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image or video. Please select correct file type.'))
  }
}


module.exports = multer({
  storage: storage,
  fileFilter: checkFile,
  limits: {
    fileSize: 20 * 1024 * 1024, //5MB
  }
})