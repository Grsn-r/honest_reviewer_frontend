class Api{
    constructor(options){
        this._baseURL = options._baseURL;
        this._headers = options._headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }
}