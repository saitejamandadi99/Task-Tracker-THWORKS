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
        enum:['high','mid','low'],
        required:true
    },
    dueDate: {
        type:Date,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
        {timestamps: true}
)

module.exports = mongoose.model('Task', taskSchema)