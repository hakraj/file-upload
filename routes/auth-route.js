const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/auth-controller')

// router.get('/', getAllUsers)
// router.get('/:id', getUser)
router.post('/login', loginUser)
router.post('/register', registerUser)
// router.put('/update/:id', updateUser)
// router.delete('/delete/:id', deleteUser)

module.exports = router