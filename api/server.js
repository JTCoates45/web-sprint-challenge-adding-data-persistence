const express = require('express');
const resourceRouter = require('./resource/router');
const projectRouter = require('./project/router');
const taskRouter = require('./task/router');

const server = express();
server.use(express.json());
server.use('/api/resources', resourceRouter);
server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);

server.use('*', (req, res) => {
    res.status(404).json({ message: '404 Not Found'});
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack
    });
})  

module.exports = server;