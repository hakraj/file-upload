const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: `This user ${email} already exists. Login to continue`,
      })
    } else {
      //hash password 
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role || 'user'
      })

      if (newUser) {
        res.status(200).json({
          success: true,
          message: ` New user created successfully. Login to continue`,
          data: newUser,
        })
      } else {
        res.status(400).json({
          success: false,
          message: `Unable to register student ${email} `,
        })
      }
    }

  } catch (error) {
    console.error('Caught an error', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Try again.'
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    if (!userExists) {
      res.status(404).json({
        success: false,
        message: `User does not exist`,
      })
    } else {
      const passwordMatch = await bcrypt.compare(password, userExists.password)
      if (passwordMatch) {

        const accessToken = jwt.sign({
          userId: userExists._id,
          username: userExists.name,
          role: userExists.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' })

        res.status(200).json({
          success: true,
          message: `Login successfully`,
          token: accessToken,
        })
      } else {
        res.status(401).json({
          success: false,
          message: `Invalid credentials!`,
        })
      }
    }

  } catch (error) {
    console.error('Caught an error', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Try again.'
    })
  }
}

module.exports = { loginUser, registerUser }