const mongoose = require('mongoose')

const Calendar = mongoose.model('calendar', {
    subject: {
        type: String
    },
    location: {
        type: String
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },

})
module.exports = Calendar;