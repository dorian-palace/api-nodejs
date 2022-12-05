const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

// Routes
module.exports = {
    register: function(req, res){
        //params
        const email = req.body.email;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        if (email == null || password == null || firstname == null || lastname == null){
            return res.status(400).json({'error': 'missing params'});
        }

        models.user.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound){
            if (!userFound) {
                
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    const newUser = models.user.create({
                        email: email,
                        password : bcryptedPassword,
                        firstname : firstname,
                        lastname : lastname
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'id': newUser.id
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({'error': 'impossible d’ajouter l’utilisateur'});
                    });
                });
            } else {
                return res.status(409).json({'error': 'l’utilisateur existe déjà'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'impossible de vérifier l’utilisateurs '});
        })

    },
    login: function(req, res){

    }
}