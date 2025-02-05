const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(404).json({
      success: false,
      message: "Access denied. Login to continue."
    })
  } else {
    try {
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY,)

      req.userInfo = decodedToken
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Login to continue."
      })
    }
  }

  next()
}

module.exports = authMiddleware