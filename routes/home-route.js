const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  const { userId, username, role } = req.userInfo
  console.log(req.userInfo);
  res.status(200).json({
    success: true,
    message: "Welcome to homepage",
    user: {
      _id: userId,
      username: username,
      role: role
    }
  })
})


module.exports = router