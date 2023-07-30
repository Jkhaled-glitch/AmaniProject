const express = require('express')
const router = express.Router();


const Admin = require('../models/admin')

router.post('/addadmin',async(req, res,next) => {

 const name = req.body.name;
 const designation = req.body.designation;
 const projects = req.body.projects;
 const email = req.body.email; 
 const country = req.body.country;

 
 try{
    const admin = new Admin({name,designation,projects,email,country});
    await admin.save();
    res.send("successfully added")
 } catch (err) {
    res.send(err);
  }
})

 router.get('/projects/:id', async (req, res) => {
   console.log("hello");
     const adminid = req.params.id;   
     try {
        const admin = await Admin.findOne({ _id: adminid });
        console.log(admin);
       res.send(admin.projects);
     } catch (err) {
       res.send(err);
     }
   });

 router.delete('/:id', async (req, res) => {
     
        const adminid = req.params.id;
        
        try {
            await Admin.deleteOne({ _id: adminid });
           
          res.send("successefully deleted");
        } catch (err) {
          res.send(err);
        }
      });


      router.put('/:id', async (req, res) => {
        const adminid = req.params.id;
        
        try {
          const updatedAdmin = await Admin.findByIdAndUpdate(adminid, req.body, { new: true });
          
          res.json(updatedAdmin);
        } catch (err) {
          res.status(500).json({ error: 'Failed to update admin' });
        }
      });
   
         

         router.get('/', async (req, res) => {
          try {
            const admins = await Admin.find();
            res.send(admins);
          } catch (err) {
            res.send(err);
          }
        });

        router.get('/projects/:id', async (req, res) => {
            const adminid = req.params.id;
            
            try {
               const admin = await Admin.findOne({ _id: adminid });
               console.log(admin);
              res.send(admin.projects);
            } catch (err) {
              res.send(err);
            }
          });




          module.exports= router