const router = require('express').Router();
const Sequelize = require('sequelize');
const { Course, User } = require('../models');

// Returns a list of courses (including the user that owns each course)
router.get('/', (req, res, next) => {
    //TODO - Filter out created/updated dates and user.password in query
    Course.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: User,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        }]
    })
        .then( courses => {
            res.json({
                count: courses.length,
                courses: courses
            });
        })
        .catch(err => {
            next(err)
        })
});

// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', (req, res) => {
    res.json({
        test: 'courses'
    })
});

// Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', (req, res) => {
    //TODO - Filter out created/updated dates and user.password in query
    res.json({
        test: 'courses'
    })
});

// Updates a course and returns no content
router.put('/:id', (req, res) => {

    //TODO - Ensure that a user can only edit their own courses
    res.json({
        test: 'courses'
    })
});

// Deletes a single course and returns no content
router.delete('/:id', (req, res) => {
    //TODO - Ensure that a user can only delete their own courses
    res.json({
        test: 'courses'
    })
});

module.exports = router;
