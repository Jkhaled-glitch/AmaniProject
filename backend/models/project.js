

const mongoose = require('mongoose')
const Project = mongoose.model('project',{
    projecttitle: {
        type: String
    },
    employeename: {
        type: String
    },
    status: {
        type: String
    },
    tasks: {
        type: Array
    },
    employeeEmail: {
        type:String
    }
    
})
module.exports= Project;