const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const Colors = require('./Constants/Colors');

const SERVER_PORT = process.env.PORT || 3000;
const STATIC_DIR = 'dist';

app.use(express.static(path.join(__dirname, STATIC_DIR)))
// app.use(express.static(STATIC_DIR));

io.on('connection', socket => {
    console.log("Socket ID: " + socket.id);
    console.log('New connection');
    // io.emit('user-connected', null);
    socket.broadcast.emit('user-connected');

    socket.emit('welcome', {
        // username: 'Anonymous',
        color: Colors[parseInt(Math.random() * Colors.length)],
        id: socket.id
    });

    socket.on('disconnect', () => {
        console.log('Disconnect');
    });
    socket.on('new-message', message => {
        socket.broadcast.emit('new-message', message);
        // io.emit('new-message', message);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    })
});

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html', { root: __dirname });
});


http.listen(SERVER_PORT, () => {
    console.log('Server running on port ' + SERVER_PORT);
});
