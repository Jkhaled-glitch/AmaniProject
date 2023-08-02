const mongoose = require('mongoose')
const Task = mongoose.model('task',{
    Title: {
        type: String,
    },
    ProjectId: { 
        type: String,
        required:true,
    },
    Status: {
        type: String,
    },
    Priority: {
        type: String,
    },
    CreatedBy: {
        type: String,
    },
    Summary: {
        type: String,
    },
    CreationDate: {
        type: Date,
    },
    ExpirationDate: {
        type: Date,
    },


   
})
module.exports= Task;