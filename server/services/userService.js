// All services related to the user routes.
// The logic directly accessing the database will go here.

const getUser = (id) => {
    return {
        id: Number(id),
        password: 'some password',
        placeCategory: 'some type of place',
    }
}

const createUser = (id, password, placeCategory) => {
    return {
        id: Number(id),
        password,
        placeCategory,
    }
}

const updateUser = (id, placeCategory) => {
    return {
        id: Number(id),
        placeCategory,
    }
}

const deleteUser = (id) => {
    return {
        id,
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
