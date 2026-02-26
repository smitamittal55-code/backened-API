const express = require('express');
const AuthController = require('../controllers/AuthController');
const route = express.Router();
const auth = require('../middleware/auth');
const ClassController = require('../controllers/classController');
const ClassModel = require('../models/classModel');

route.post('/register', AuthController.register)
route.post('/login', AuthController.login)
route.post('/logout', AuthController.logout)
route.get('/profile', auth, AuthController.getProfile)
route.get('/all-users', auth, AuthController.getAllUsers)
route.delete('/delete-user/:id', auth, AuthController.deleteUser)

// admin routes
route.put('/admin/update-user/:id',auth,AuthController.AdminupdateUser)
route.put('/update-profile', auth, AuthController.updateProfile)
route.put('/change-password', auth, AuthController.changePassword)



route.post('/teacher/register', AuthController.register)
route.post('/teacher/login', AuthController.login)
route.post('/teacher/logout', AuthController.logout)
route.get('/teacher/profile', auth, AuthController.getProfile)
route.get('/teacher/all-users', auth, AuthController.getAllUsers)
route.delete('/teacher/delete-user/:id', auth, AuthController.deleteUser)

// admin teacher routes
route.put('/teacher/admin/update-user/:id',auth,AuthController.AdminupdateUser)
route.put('/teacher/update-profile', auth, AuthController.updateProfile)


// Crud routes

// CRUD Class Routes

route.post('/createClass', ClassController.createClass);
route.get('/classes', ClassController.getClasses);
route.put('/classes/:id', ClassController.updateClass);
route.delete('/classes/:id', ClassController.deleteClass);



module.exports = route;