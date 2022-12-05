const express = require('express');

const server = express();

//configuration des routes
server.get('/', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Hello serv');
});

//Lancement serveur
server.listen(8080, function(){
    console.log('Serveur en marche');
})