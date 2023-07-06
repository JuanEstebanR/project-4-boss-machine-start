const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea'); 
module.exports = ideasRouter;

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (!idea) {
        res.status(404).send('Idea not found');
    } else {
        req.idea = idea;
        next();
    }
})


function validateInputs(req, res, next) {
    const { name, description, numWeeks, weeklyRevenue} = req.body;
    if (!name || !description || !Number(numWeeks) || !Number(weeklyRevenue) ) {
        res.status(400).send('Missing required fields');
    } else {
        req.name = name;
        req.description = description;
        req.numWeeks = numWeeks;
        req.weeklyRevenue = weeklyRevenue;
        next();
    }
}

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})


// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const idea = addToDatabase('ideas', req.body);
    res.status(201).send(idea);
})

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = req.idea;
    res.status(200).send(idea);
})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', validateInputs, checkMillionDollarIdea, (req, res, next) => {
    const newIdea = {
        id: req.idea.id,
        name: req.name,
        description: req.description,
        numWeeks: Number(req.numWeeks),
        weeklyRevenue: Number(req.weeklyRevenue),
    }

    const idea = updateInstanceInDatabase('ideas', newIdea);
    res.status(200).send(idea);
})

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const idea = deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send(idea);

})