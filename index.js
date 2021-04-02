require('dotenv').config();
require('./database/mongoose');

const cors = require('cors');
const express = require('express');
const route = require('./routes/index');

// build server
const app = express();
const server = require('http').Server(app);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());
app.use('/', route);

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
