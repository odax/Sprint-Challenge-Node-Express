const express = require('express');

const projectRoutes = require('./modules/projects');
const actionRoutes = require('./modules/actions');

const server = express();

server.use(express.json());

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.use('/', (req, res) => {
    res.send('API up and running!')
})

server.listen(5000, () => console.log('server is active and running on port 5000'));