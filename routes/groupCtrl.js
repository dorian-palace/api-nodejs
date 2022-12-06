const { Sequelize } = require('../models');
const models = require('../models');

module.exports = {
    newGroup: function(req, res){
        const name = req.body.name;

        if (name == null) {
            return res.status(400).json({'error': 'missing params'});
        }

        models.Groupe.findOne({
            attributes: ['name'],
            where: {name: name}
        })
        .then(function(groupFound){
            if (!groupFound){
                const newGroup = models.Groupe.create({
                    name: name
                })
                .then(function(newGroup){
                    return res.status(201).json({
                        'id': newGroup.id
                    })
                })
                .catch(function(err){
                    return res.status(500).json({'error': 'impossible de créer un nouveau groupe'});
                })
            } else {
                return res.status(409).json({'error': 'le groupe existe déjà'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'impossible de vérifier le groupe'});
        })
    },

    listGroup: function(req, res){

    }
}