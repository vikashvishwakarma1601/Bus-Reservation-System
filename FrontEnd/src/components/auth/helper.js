import { API } from '../backend'


export const login = async (user) => {
    return await fetch(`${API}auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'

        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
            console.log("Falied to Login")
        })
}

export const register = (user) => {
    return fetch(`${API}auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
            console.log("Falied to Register")
        })
}

export const logout = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('authToken')
        next()
    }

    return fetch(`${API}Logout`, {
        method: 'GET',
    })
        .then((response) => { response.json({ message: "Logout Successfully" }) })
        .catch((error) => { console.log("Failed to Logout") })
}


export const updatePassword = async (user) => {
    return await fetch(`${API}user/update-password`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => {response.json()})
    .catch((error) =>{console.log("Failed to Update Password")})
}



export const authenticate = (token,UserID, next) => {
    if (typeof window !== "undefined") {
        console.log(UserID)
        localStorage.setItem("authToken", JSON.stringify(token))
        localStorage.setItem("UserID", JSON.stringify(UserID))
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("authToken")) {
        return JSON.parse(localStorage.getItem("authToken"));
    }
    else {
        return false
    }
} 