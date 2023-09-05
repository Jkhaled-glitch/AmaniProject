const express = require('express')
const router = express.Router();

const Task = require('../models/task')

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    geted = await Task.findOne({ _id: id });
    res.send(geted);
  } catch (err) {
    res.send(err);
  }
});

router.get('/getbyproject/:id', async (req, res) => {
  const id = req.params.id;
  try {
    geted = await Task.find({ ProjectId: id });
    res.send(geted);
  } catch (err) {
    res.send(err);
  }
});

router.get('/getbyproject/:id/rate/:date', async (req, res) => {
  let allTasks = 0;
  let numTasksDone = 0;
  const id = req.params.id;
  const expirationDate = new Date(req.params.date);

  try {
    // Récupérer toutes les tâches pour le projet donné
    const tasks = await Task.find({ ProjectId: id });
    allTasks = tasks.length;

    // Récupérer les tâches qui ont une date d'expiration inférieure à la date spécifiée
    const tasksDone = await Task.find({ 
      ProjectId: id,
      Status: 'Done',
      ExpirationDate: { $lt: expirationDate } 
    });
    numTasksDone = tasksDone.length;

    res.send({
      rate: allTasks === 0 ? 0 : ((numTasksDone / allTasks)*100) // Ajout d'une vérification pour éviter une division par zéro
    });

  } catch (err) {
    res.status(500).send(err);
  }
});



router.post('/add/:id', async (req, res) => {
  const Title = req.body.Title;
  const ProjectId = req.params.id; // Access the dynamic 'id' parameter from the URL
  const Status = req.body.Status;
  const Priority = req.body.Priority;
  const CreatedBy = req.body.CreatedBy;
  const Summary = req.body.Summary;
  const CreationDate = req.body.CreationDate;
  const ExpirationDate = req.body.ExpirationDate;
  const Color = req.body.Color;
  const Description = req.body.Description;
  try {
    const task = new Task({ Title, ProjectId, Status, Priority, CreatedBy, Summary, CreationDate, ExpirationDate, Color, Description });
    await task.save();
    res.send("Successfully added task");
  } catch (err) {
    res.send(err);
  }
});

router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.deleteOne({ _id: taskId });
    res.send("successefully deleted");
  } catch (err) {
    res.send(err);
  }
});
module.exports = router