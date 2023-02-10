// Routes relating to the users
const express = require('express');

const {
    getUserByEmail,
    createUser,
} = require('../services/userService');

const userRouter = express();
userRouter.use(express.json());

// Get a specific user by email
userRouter.get('/:email', async (req, res) => {
    try {
        console.log('getting user...');

        const { email } = req.params;
        const user = await getUserByEmail(email);
        
        res.status(200).send({
            user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

userRouter.post('/', async (req, res) => {
    try {
        console.log('creating user...');

        const { email, password } = req.body;

        const user = await createUser(email, password);

        res.status(200).send({
            newUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userRouter;
