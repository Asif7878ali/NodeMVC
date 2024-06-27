const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 4000
//Routes
const getRoute = require('./Routes/getroute.js');

// Set view engine
app.set('view engine','ejs');
app.set('views','./views');

//Route
app.use('/', getRoute);

io.on('connection', (socket) =>{
    console.log('User Connect');
    socket.on('disconnect', () =>{
        console.log('User Disconnected');
    });
})
// Make io instance available to routes
app.set('socketio', io);

server.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})