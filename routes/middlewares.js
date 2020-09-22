const jwt = require('jwt-simple');
const moment = require('moment');

// Middelware to check the token obtained in the login
const checkToken = (req, res, next) => {

    if(!req.headers['user-token']) {
        return res.status(404).json({ error: 'You have to include the user-token in the header.' });
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'Secret')
    } catch(err) {
        return res.status(403).json({ error: 'The token is incorrect' })
    }

    if(payload.expiredAt < moment().unix()) {
        return res.json({ error: 'The token has expired' })
    }

    req.usuarioId = payload.usuarioId;

    next();
}

// Middelware to check if the role is admin
const isAdmin = (req, res, next) => {
    const role = req.body.role
    if(!role) {
        res.status(400).json({ error: 'You have to send the role.' });
        return;
    }
    if(!(role.toLowerCase() === 'admin') ) {
        res.status(403).json({ error: 'You dont have autorization to perform this action' });
        return;
    }
    next();
}

module.exports = {
    checkToken: checkToken,
    isAdmin: isAdmin
}
