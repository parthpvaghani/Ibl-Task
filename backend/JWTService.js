const key = require('./config').jwtSecretKey
const jwt = require('jsonwebtoken')


const generateToken = (email,userid) => {
    let token = jwt.sign({ email,userid}, key);
    return token
}


const verifyToken = (token) => {
    jwt.verify(token, key, function(err, decoded) {
        console.log(decoded) // bar
      });
}

const decodeToken = (token) => {
    var decoded = jwt.verify(token,key);
    console.log(decoded) // bar
}

module.exports = {
    generateToken,
    decodeToken,
    verifyToken
}