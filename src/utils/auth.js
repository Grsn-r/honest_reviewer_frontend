const BASE_URL = 'honestreviewerbackend-production.up.railway.app';

export const register = (email, password, name) => {
    fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email, password, name}),
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    .catch(err => {
        return err.json().then(error => {
            alert(error.message)
            throw error
        })
    })
};

export const login = (email, password) => {
    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email, password}),
    })
}