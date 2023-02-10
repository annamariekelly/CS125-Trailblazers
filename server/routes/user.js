// Routes relating to the users
const express = require('express');

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../services/userService');

const userRouter = express();
userRouter.use(express.json());

// Get a specific user by student id
userRouter.get('/:id', async (req, res) => {
    try {
        console.log('getting user...');

        const { id } = req.params;
        const user = await getUser(id);
        
        res.status(200).send({
            user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Create a new user
userRouter.post('/', async (req, res) => {
    try {
        console.log('creating user...');

        const { id, password } = req.body;

        const user = await createUser(id, password);

        res.status(200).send({
            newUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update a user's preferences
userRouter.put('/', async (req, res) => {
    try {
        console.log('updating user...');

        const { id, password } = req.body;

        const user = await updateUser(id, password);

        res.status(200).send({
            updatedUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Delete a user by student id
userRouter.delete('/:id', async (req, res) => {
    try {
        console.log('deleting user...');

        const { id } = req.params;

        await deleteUser(id);

        res.status(200).send(`Deleted user with id: ${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userRouter;
