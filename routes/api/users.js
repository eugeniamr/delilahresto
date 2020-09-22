const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../dbConfg');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const middelwares = require('../middlewares');


// POST - Register a new user
router.post('/register', [
    check('username', 'The username cannot be empty.').not().isEmpty(),
    check('password', 'The password cannot be empty.').not().isEmpty(),
    check('firstname', 'The first name cannot be empty.').not().isEmpty(),
    check('lastname', 'The last name cannot be empty.').not().isEmpty(),
    check('email', 'Make sure the email is written correctly and cannot be empty.').isEmail(),
    check('address', 'Make sure the address is written correctly and cannot be empty.').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(200).json(user);

});

// POST - Login a User
router.post('/login', async (req, res) => {
    
    const user = await User.findOne({ where: { email: req.body.email, username: req.body.username } });

    if(user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if(iguales) {
            res.status(200).json({ success: createToken(user) });
        } 
        return res.status(401).json({ error: 'Theres an error in username or the password' });
        
    } 

    
})

// GET - Obtain all the users
router.get('/allUsers', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    console.log(req.usuarioId);
    const users = await User.findAll();
    res.status(200).json(users);
})

// GET - Obtain one user
router.get('/:userId',middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.userId } });
    res.status(200).json(user);
});

// PUT - Edit one user
router.put("/:userId", middelwares.checkToken, middelwares.isAdmin, async (req, res) => {
    await User.update(req.body, {
      where: { id: req.params.userId },
    });
    res.status(200).json({ success: "The user was edited successfully" });
});

// DELETE - Delete one user
router.delete("/:userId", middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await User.destroy({
      where: { id: req.params.userId },
    });
    res.status(200).json({ success: "The user was deleted successfully" });
});


const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }

    return jwt.encode(payload, 'Secret')
}

module.exports = router;
