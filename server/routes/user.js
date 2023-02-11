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

        const { id, password, placeCategory } = req.body;

        const user = await createUser(id, password, placeCategory);

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

        const { id, placeCategory } = req.body;

        const user = await updateUser(id, placeCategory);

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

// ~~~~~~~~~~~~~ DON'T TEST ANY ROUTES BELOW ~~~~~~~~~~~~~

// Add a new trip to a user's past trips
// TODO: Check if there's a unique id tied to each place in yelp api
userRouter.post('/pastTrips', async (req, res) => {
    try {
        console.log('adding trip to past trips...');

        const { name, rating } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            updatedUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update a trip from a user's past trips
userRouter.put('/pastTrips', async (req, res) => {
    try {
        console.log('updating trip from past trips...');

        const { name, rating } = req.body;

        await deleteUser(id);

        res.status(200).send(`Deleted user with id: ${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Add a new trip to a user's saved trips
userRouter.post('/savedTrips', async (req, res) => {
    try {
        console.log('adding trip to saved trips...');

        const { id } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            updatedUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update a trip from a user's saved trips
userRouter.put('/savedTrips', async (req, res) => {
    try {
        console.log('updating trip from saved trips...');

        const { name, rating } = req.body;

        await deleteUser(id);

        res.status(200).send({
            updatedUser: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Remove a trip from a user's saved trips
userRouter.delete('/savedTrips', async (req, res) => {
    try {
        console.log('deleting trip from saved trips...');

        const { id } = req.params;

        const user = await updateUser(id, placeCategory);

        res.status(200).send(`Deleted user with id: ${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userRouter;
