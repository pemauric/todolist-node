const express = require('express')

const router = express.Router()

const TaskController = require("../controllers/TaskController")
const Task = require('../models/Task')

router.get('/', TaskController.showTasks)

router.get('/add', TaskController.createTask )

module.exports = router