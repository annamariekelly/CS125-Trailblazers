// All services related to the user routes.
// The logic directly accessing the database will go here.

const getUser = (email) => {
    return {
        email,
        password: 'some password',
    }
}

const createUser = (email, password) => {
    return {
        email,
        password,
    }
}

const updateUser = (email, password) => {
    return {
        email,
        password,
    }
}

const deleteUser = (email) => {
    return {
        email,
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
