require('dotenv').config();
require('./database/mongoose');
const cors = require('cors');
const express = require('express');

// build server
const app = express();
const server = require('http').Server(app);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// parser middleware
app.use(express.json());
app.use(cors);

// build io socket
const io = require('socket.io')(server);
io.on('connection', (client) => {
    client.on('event', (data) => {
        /* … */
    });
    client.on('disconnect', () => {
        /* … */
    });
});

// start server
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
