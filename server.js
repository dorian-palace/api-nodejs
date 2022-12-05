const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

const server = express();

server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());

//configuration des routes
server.get('/', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Hello serv');
});

server.use('/api/', apiRouter);

//Lancement serveur
server.listen(8889, function(){
    console.log('Serveur en marche');
})