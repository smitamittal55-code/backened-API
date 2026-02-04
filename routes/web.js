const express = require('express')
const UserController = require('../controllers/UserController')
const route = express.Router()


route.get('/display',UserController.display)







module.exports = route