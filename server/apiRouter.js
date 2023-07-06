const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);


module.exports = apiRouter;
