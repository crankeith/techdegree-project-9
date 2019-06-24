const router = require('express').Router();
const { User } = require('../models');
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');

const validPassword = (password, storedHash) => {
    return bcrypt.compareSync(password, storedHash);
};

router.get('/', (req, res, next) => {
    const credentials = auth(req);
    // find user by email address
    User.findOne({
        where: {
            emailAddress: credentials.name
        }
    })
        .then( user => {
            // extract data from user object
            const { id, firstName, lastName, emailAddress, password, createdAt, updatedAt } = user;
            // validate password
            const authenticated = validPassword(credentials.pass, password);

            // if user is authenticated then return users data
            if(authenticated){
                res.json({
                    id,
                    firstName,
                    lastName,
                    emailAddress,
                    createdAt,
                    updatedAt
                })

            } else {
                let err = new Error("Not Authorized");
                err.status = 401;
                next(err);
            }
        })
        .catch( err => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    //Deconstruct body
    const { firstName, lastName, emailAddress, password } = req.body;
    console.log(firstName, lastName, emailAddress, password);

    //TODO - Add email address validation
    //TODO - Validate that the email isn't already existing

    //Create User in DB
    User.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password //Password is automatically hashed by Model
    })
        .then(user => {
            console.log(user);
            //Set Location header to root and status to 201
            res.location('/').status(201).end();
        })
        .catch( err => {
            next(err);
        });

});

module.exports = router;
