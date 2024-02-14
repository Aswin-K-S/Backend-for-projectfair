const express = require('express');

const userController = require('../Controllers/userController')

const projectController =require('../Controllers/projectControllers')

const jwtMiddleware = require("../Middlewares/jwtMiddleware")


const multerConfig = require('../Middlewares/multerMiddleware');

//create router object of express to define path
const router = new express.Router()

//using router object to define path

//Register API path - http://localhost:4000/register -  frontend ->
router.post('/register',userController.register)

router.post('/login',userController.login)

//add user project API path 
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get all users projects path - http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

//get all projects  path- http://localhost:4000/project/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get home projects path- http://localhost:4000/project/home-projects
router.get('/project/home-projects',projectController.getHomeProjects)  //no need of token verification coz it is displayed before login

//update project
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

//Delete project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router
