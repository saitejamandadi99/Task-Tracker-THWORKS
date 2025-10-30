const mongoose = require('mongoose')
const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String
    },
    priority:{
        type:String,
        enum:['High','Medium','Low'],
        required:true
    },
    status: {
        type:String,
        enum: ['Open', 'In Progress', 'Done']

    },
    dueDate: {
        type:Date,
        required:true
    },
},
        {timestamps: true}
)

module.exports = mongoose.model('Task', taskSchema)