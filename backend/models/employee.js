const mongoose = require('mongoose')

const Employee = mongoose.model('employee', {
    name: {
        type: String
    },
    projects: {
        type: Array
    },
    status: {
        type: String
    },
    weeks: {
        type: Number
    },
    location: {
        type: String
    },
    email: {
        type: String
    },

})
module.exports = Employee;