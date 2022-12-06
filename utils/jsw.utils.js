const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'oaziehiozaaoi8756123hiauzdi29';

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            id: userData.id
        },
        JWT_SIGN_SECRET, 
        {
            expiresIn: '1h'
        })
    }
}