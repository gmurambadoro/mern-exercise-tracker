const router = require('express').Router();
const Joi = require('joi');

const Exercise = require('../models/exercise.model');

const validateExercise = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        description: Joi.string().trim().trim(),
        duration: Joi.number().required().greater(0),
        date: Joi.date().required(),
    });

    return schema.validate(data);
}

router.route('/')
    // collection
    .get((req, res) => {
        Exercise.find()
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err))
        ;
    })
    // create
    .post((req, res) => {
        const data = {
            ...req.body,
        };

        const {error, value} = validateExercise(data);

        if (error) {
            return res.status(400).json(error);
        }

        const exercise = new Exercise({ ...value });

        exercise.save()
            .then(details => res.json(details))
            .catch(err => res.status(500).json(err))
        ;
    })
;

router.route('/:id')
    // read
    .get((req, res) => {
        const { id } = req.params;

        Exercise.findById(id)
            .then((data) => res.json(data))
            .catch(err => res.status(404).json(err));
    })
    // update
    .put((req, res) => {
        const { id } = req.params;

        const { error, value } = validateExercise(req.body);

        if (error) {
            return res.status(400).json(error);
        }

        Exercise.findOneAndUpdate(id, {...value})
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    })
    // delete
    .delete((req, res) => {
        const { id } = req.params;

        Exercise.findByIdAndDelete(id)
            .then(data => res.json(data))
            .catch(err => res.status(404).json(err));
    })
;

module.exports = router;