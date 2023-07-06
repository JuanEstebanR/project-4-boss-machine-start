const express = require('express');
const minionsRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db')

//Check if the id provide exist in the array  of minions
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (!minion) {
    res.status(404).send('Minion not found');
  } else {
    req.minion = minion;
    next();
  }
})
// Functions to validate inputs for a Minion
function validateInputs(req, res, next) {
  const { name, title, salary } = req.body;
  if (!name || !title || !Number(salary)) {
    res.status(400).send('Missing required fields');
  } else {
    req.name = name;
    req.title = title;
    req.salary = Number(salary);
    next();
  }
}

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions)
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion)
})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', validateInputs, (req, res, next) => {
  const newMinion = {
    id: req.minion.id,
    name: req.name,
    salary: req.salary,
    title: req.title,
    weaknesses: req.minion.weaknesses
  }
  const minion = updateInstanceInDatabase('minions', newMinion);
  res.status(200).send(minion);
})

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.minion.id;
  res.status(204).send(`Minion deleted: ${deleteFromDatabasebyId('minions', minionId)}`);
})



module.exports = minionsRouter;