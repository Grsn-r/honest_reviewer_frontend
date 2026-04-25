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

    setUserData(data) {
        return fetch(`${this._baseURL}/users/me/profile`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
        .then(this._checkResponse);
    }

    setPassword(data) {
        return fetch(`${this._baseURL}/users/me/password`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
        .then(this._checkResponse);
    }

    setReview(data) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('image', data.picture);
        return fetch(`${this._baseURL}`, {
            method: 'POST',
            headers: {
                Authorization: this._headers.Authorization,
            },
            body: formData
        })
        .then(this._checkResponse);
    }

    getReviews() {
        return fetch(`${this._baseURL}`, {
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