const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jsw.utils');
const models = require('../models');
const { Sequelize } = require('../models');

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

        //params login
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null ) {
            return res.status(400).json({'error': 'params manquant'});
        }

        models.user.findOne({
            where: {email : email}
        })
        .then(function(userFound){
            if (userFound){

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt) {
                        return res.status(200).json({
                            'id' : userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({'error': 'mot de passe invalide'});
                    }
                })
            } else {
                return res.status(404).json({'error': 'l‘utilisateur n‘éxiste pas en DB'});
            }
        }) 
        .catch(function(err){
            return res.status(500).json({'error': 'impossible de trouver l‘utilisateur'});
        })
    },

    listUser: function(req, res) {
        // const firstname = req.body.firstname;
        // // console.log(firstname)
        // const lastname = req.body.lastname;

        models.user.findAll({
            attributes: ['firstname', 'lastname']
            // attributes: {['firstname']['lastname']}
                // firstname: Sequelize.firstname,
                // lastname: Sequelize.lastname
        }).then(function(messages){
            return res.status(200).json(messages);
        }).catch(function(err){
            console.log(err);
            res.status(500).json({'error': 'champs invalide'});
        });

    }

}