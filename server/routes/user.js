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

        const { userId, businessId, rating } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            newPastTrip: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update a trip from a user's past trips (for our use case, just to update rating)
userRouter.put('/pastTrips', async (req, res) => {
    try {
        console.log('updating trip from past trips...');

        const { userId, businessId, rating } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            updatedPastTrip: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Add a new trip to a user's saved trips.
// Note that this can also be a part of past trips.
userRouter.post('/savedTrips', async (req, res) => {
    try {
        console.log('adding trip to saved trips...');

        const { userId, businessId, rating } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            updatedSavedTrip: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Update a trip from a user's saved trips (for our use case, just to update rating)
// Note that this can also be a part of past trips.
userRouter.put('/savedTrips', async (req, res) => {
    try {
        console.log('updating trip from saved trips...');

        const { userId, businessId, rating } = req.body;

        const user = await updateUser(id, placeCategory);

        res.status(200).send({
            updatedSavedTrip: user,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Remove a trip from a user's saved trips
// Note that this can also be a part of past trips.
userRouter.delete('/savedTrips', async (req, res) => {
    try {
        console.log('deleting trip from saved trips...');

        const { userId, businessId } = req.params;

        const user = await updateUser(id, placeCategory);

        res.status(200).send(`Deleted saved trip for user (${userId}) with business id: ${businessId}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userRouter;
