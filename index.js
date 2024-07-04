const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 4000
//Routes
const getRoute = require('./Routes/getroute.js');

// Set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));

//Route
app.use('/', getRoute);

io.on('connection', (socket) =>{
    console.log('User Connect');
    socket.on('disconnect', () =>{
        console.log('User Disconnected');
    });
})

server.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = io;