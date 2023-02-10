const getUserByEmail = (email) => {
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

module.exports = {
    getUserByEmail,
    createUser,
}
