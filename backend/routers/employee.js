
const express = require('express')
const router = express.Router();


const Employee = require('../models/employee')

router.post('/addemployee',async(req, res,next) => {

 const name = req.body.name;
 const projects = req.body.projects;
 const status = req.body.status;
 const weeks = req.body.weeks; 
 const location = req.body.location;
 const email = req.body.email;

 
 try{
    const employee = new Employee({name,projects,status,weeks,location,email});
    await employee.save();
    res.send("successfully added")
 } catch (err) {
    res.send(err);
  }
})

 router.get('/projects/:id', async (req, res) => {
   console.log("hello");
     const employeeidd = req.params.id;   
     try {
        const employee = await Employee.findOne({ _id: employeeidd });
        console.log(employee);
       res.send(employee.projects);
     } catch (err) {
       res.send(err);
     }
   });

 router.delete('/:id', async (req, res) => {
     
        const employeeid = req.params.id;
        
        try {
            await Employee.deleteOne({ _id: employeeid });
           
          res.send("successefully deleted");
        } catch (err) {
          res.send(err);
        }
      });


      router.put('/:id', async (req, res) => {
        const employeeid = req.params.id;
        
        try {
          const updatedEmployee = await Employee.findByIdAndUpdate(employeeid, req.body, { new: true });
          
          res.json(updatedEmployee);
        } catch (err) {
          res.status(500).json({ error: 'Failed to update employee' });
        }
      });
   
         

         router.get('/', async (req, res) => {
          try {
            const employees = await Employee.find();
            res.send(employees);
          } catch (err) {
            res.send(err);
          }
        });

        router.get('/projects/:id', async (req, res) => {
            const employeeidd = req.params.id;
            
            try {
               const employee = await Employee.findOne({ _id: employeeidd });
               console.log(employee);
              res.send(employee.projects);
            } catch (err) {
              res.send(err);
            }
          });




          module.exports= router