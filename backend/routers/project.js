const express = require('express')
const router = express.Router();

const Project = require('../models/project')

router.post('/addproject',async(req, res,next) => {
 const projecttitle = req.body.projecttitle;
 const employeename = req.body.employeename;
 const status = req.body.status;
 const tasks = req.body.tasks;
 try{
    const project = new Project({projecttitle,employeename,status,tasks});
    await project.save();
    res.send("successfully added")
 } catch (err) {
    res.send(err);
  }
});

router.get('/:id/tasks', async (req, res) => {

      const projectidd = req.params.id;
      
      try {
         const project = await Project.findOne({ _id: projectidd });

         console.log(project);
        res.send(project.tasks);
      } catch (err) {
        res.send(err);
      }
    });
    router.delete('/:id', async (req, res) => {
        console.log("hello");
          const projectidd = req.params.id;
          
          try {
              await Project.deleteOne({ _id: projectidd });
             
            res.send("successefully deleted");
          } catch (err) {
            res.send(err);
          }
        });
        router.put('/:id', async (req, res) => {
            console.log("hello");
              const projectidd = req.params.id;
              const projecttitle = req.body.projecttitle;
              const employeename = req.body.employeename;
              const status = req.body.status;
              const tasks = req.body.tasks;
              try {
                
                const projectt=   await Project.findByIdAndUpdate(projectidd,{projecttitle: projecttitle,employeename:employeename,status:status,tasks:tasks  },{new:true});
                
                res.send("successefully updated");
              } catch (err) {
                res.send(err);
              }
            });

            router.get('/projects', async (req, res) => {
              try {
                const projects = await Project.find();
                res.send(projects);
              } catch (err) {
                res.send(err);
              }
            });

            router.get('/:id', async (req, res) => {
                const id = req.params.id;
                try {
                geted = await Project.findOne({ _id: id });
                res.send(geted);
                } catch (err) {
                res.send(err);
                }
            });


            


              module.exports= router