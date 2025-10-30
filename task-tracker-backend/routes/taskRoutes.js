const express = require('express')
const router = express.Router() 
const {createTask, getAllTasks, updateTask, deleteTask, getInsights} = require('../controllers/taskControllers')

router.post('/create',createTask)
router.get('/getAll',getAllTasks)
router.patch('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)
router.get('/insights', getInsights)

module.exports = router  