const mongoose = require('mongoose')

const Admin = mongoose.model('admin', {
    name: {
        type: String
    },
    designation: {
        type: String
    },
    projects: {
        type: Array
    },
    email: {
        type: String
    },
    country: {
        type: String
    },

})
module.exports = Admin;