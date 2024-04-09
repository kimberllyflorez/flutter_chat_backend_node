const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {


    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, (error, token) => {
            if (error) {
                reject('No se puede genera token')
            } else {
                resolve(token)
            }
        });
    });
}

module.exports = { generateJWT }