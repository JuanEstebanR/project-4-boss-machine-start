const express = require('express');
const meetingsRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting
  } = require('./db')


// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings); 
})

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('', (req, res, next) => {
    const meeting = createMeeting();
    const newMeeting = addToDatabase('meetings', meeting);
    res.status(201).send(newMeeting);
})

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})


module.exports = meetingsRouter;