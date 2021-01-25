const router = require('express').Router();
const Joi = require('joi');

const User = require('../models/user.model');

const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(3),
    });

    return schema.validate(data);
};

// get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err =>res.status(400).json('Error: ' + err))
    ;
});

// add a user
router.route('/').post((req, res) => {
    const {error, value} = validateUser(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const {username} = value;

    const user = new User({ username });

    user.save()
        .then((data) => {
            console.log('User added', data);

            return res.json(data);
        })
        .catch(err => res.status(400).json(String(err).toString()))
    ;
});

// retrieve a single user
router.route('/:username').get((req, res) => {
    const {username} = req.params;

    User.findOne({ username: username })
        .then(data => {
            if (!data) {
                return res.status(404).json('There is no user by this username.');
            }

            return res.json(data);
        })
        .catch((err) => res.status(400).json(String(err).toString()))
    ;
});

module.exports = router;