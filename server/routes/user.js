// Routes relating to the users
const express = require('express');

const {
    getUserByEmail
} = require('../services/userService');

const userRouter = express();
userRouter.use(express.json());

// Get a specific user by email
userRouter.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        
        res.send({
            user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userRouter;
