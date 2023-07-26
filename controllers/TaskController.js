const Task = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
    res.render('tasks/create')
    }  

    static async showTasks(req, res) {
    
        const tasks = await Task.findAll({raw: true})

        console.log(tasks)
    
        res.render('tasks/all', {tasks: tasks})
    }

    static async createTaskSave(req, res) {
        
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false,
        }

        await Task.create(task)
        
        console.log(req.body)

        res.redirect('/')
    }   

    static async deleteTask(req, res) {
        
        const id = req.body.id

        await Task.destroy({where: {id: id}})   
        
        res.redirect('/')
    }

    static async editTask(req, res) {
        const id = req.params.id

        console.log(req.params.id)

        const task = await Task.findOne({raw: true ,where: {id: id}})

        console.log(task)

        res.render('tasks/editTask', {task: task})
    }

    static async updateTask(req, res) {
        
        const id = req.params.id

        const task = {
            title: req.body.title,
            description: req.body.description,
        }

        await Task.update(task, { where: { id: id } })

        res.redirect('/')
    }
    
    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = {
            done: req.body.done == 0 ? true : false
        }

        await Task.update(task, { where: { id: id } })

        res.redirect('/')
    }
}