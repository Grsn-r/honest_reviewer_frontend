class Api{
    constructor(options){
        this._baseURL = options.baseURL;
        this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    setAuthJwt(token) {
        this._headers['Authorization'] = `Bearer ${token}`;
    }

    getUserData() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }
}

const api = new Api({
    baseURL: 'https://honestreviewerbackend-production.up.railway.app',
    headers: {
        "Content-Type" : "application/json",
    }
});

export default api;