const express = require('express')
const router = express.Router();

const Calendar = require('../models/calendar')

router.get('/', async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.send(calendars);
  } catch (err) {
    res.send(err);
  }
});

router.post('/add', async (req, res, next) => {
  const subject = req.body.subject;
  const location = req.body.location;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  try {
    const calendar = new Calendar({ subject, location, startTime, endTime });
    await calendar.save();
    res.send("successfully added")
  } catch (err) {
    res.send(err);
  }
})

router.put('/:id', async (req, res) => {
  const calendarid = req.params.id;
  try {
    const updatedCalendar = await Calendar.findByIdAndUpdate(calendarid, req.body, { new: true });
    res.json(updatedCalendar);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update calendar' });
  }
});


router.delete('/:id', async (req, res) => {
  const calendarid = req.params.id;
  try {
    await Calendar.deleteOne({ _id: calendarid });
    res.send("successefully deleted");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router