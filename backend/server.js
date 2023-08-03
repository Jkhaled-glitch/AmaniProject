const express = require('express')
const cors = require('cors');

const app = express()

//Routers Links
const userRoute = require('./routers/user')
const employeeRoute = require('./routers/employee')
const projectRoute = require('./routers/project')
const taskRoute = require('./routers/task')
const adminRoute = require('./routers/admin')
const calendarRoute = require('./routers/calendar')

//Port
const port = 5000 || 5001 || 5002

//connect to DB
require('./config/connectDB')

app.use(express.json())
app.use(cors());

//Routers
app.use('/users', userRoute);
app.use('/employees', employeeRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/admins', adminRoute);
app.use('/calendars', calendarRoute);

//static folder in server
app.use('/uploads', express.static('./uploads'))

//starting server
app.listen(port, async (req, res) => {
    console.log(`server start on port ${port} `)
})