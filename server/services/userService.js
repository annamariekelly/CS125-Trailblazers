// All services related to the user routes.
// The logic directly accessing the database will go here.

const getUser = (id) => {
    return {
        id: Number(id),
        password: 'some password',
    }
}

const createUser = (id, password) => {
    return {
        id: Number(id),
        password,
    }
}

const updateUser = (id, password) => {
    return {
        id: Number(id),
        password,
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
