const express = require('express');
const { Socket } = require('socket.io');
const {dbConnection} = require('./database/config');

const path = require('path');
const { escape } = require('querystring');

require('dotenv').config();

//data base 
dbConnection();

///App express
const app = express();

//leer y parsear body

app.use(express.json());

///Node SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//this is server path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

///ROUTES APP
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err)

    console.log('sucess server conection');
});