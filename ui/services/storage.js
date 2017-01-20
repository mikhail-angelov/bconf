
module.exports = {
    getUser,
    setUser,
    getToken,
    setToken
}

function getUser() {
    const userSTR = localStorage.getItem('user')
    if (userSTR) {
        return JSON.parse(userSTR)
    } else {
        return null
    }
}

function setUser(user) {
    return localStorage.setItem('user', user ? JSON.stringify(user) : '')
}

function getToken() {
    return localStorage.getItem('token')
}
function setToken(token) {
    return localStorage.setItem('token', token ? token : '')
}