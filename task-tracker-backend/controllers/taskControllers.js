const Task = require('../models/taskModel')

//create tasks 
const createTask = async (req , res) =>{
    try {
        const {title, description, priority,status, dueDate} = req.body
        if(!title || !priority || !dueDate){
            return res.status(400).json({message:'require fields title, priority, dueDate'})
        }
        const newTask = await Task.create({title, description, priority, status, dueDate})
        return res.status(201).json({message:'Task created', task: newTask})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
//get all tasks 
const getAllTasks = async (req, res)=>{
    try {
        const tasks = await Task.find({}).sort({createdAt: -1})     
        if(tasks.length === 0){
            return res.status(200).json({message:'No tasks has been created yet.', tasks:[]})
        }
        return res.status(200).json({message:'Tasks fetched successfully', tasks:tasks})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//patch task on id 
const updateTask = async (req, res)=>{
    try {
        const taskId = req.params.id 
        const task =await Task.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidators:true})
        if (!task){
            return res.status(404).json({message:'Task not found'})
        }
        return res.status(200).json({message:'task updated successfully', task:task})
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//delete Task 
const deleteTask = async (req, res)=>{
    try {
        const taskId = req.params.id 
        const task = await Task.findByIdAndDelete({_id:taskId})
        if(!task){
            return res.status(404).json({message:'Task not found'})
        }
        res.status(200).json({message:'Task deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//get insights
const getInsights = async (req, res)=>{
    try {
        const openStatusTasks = await Task.countDocuments({status:'Open'})
        const upcomingTasks = await Task.countDocuments({
            status:{$ne:'Done'}, //not equals to Done
            dueDate:{$lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
        })
        let insights = `There are ${openStatusTasks} open tasks.`
        if(upcomingTasks > 0) insights += `${upcomingTasks} task(s) are due soon`
        res.status(200).json({message:'Insights fetched', insights: insights})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {createTask, getAllTasks, updateTask, deleteTask, getInsights}