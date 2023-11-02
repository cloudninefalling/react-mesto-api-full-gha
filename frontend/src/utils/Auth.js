class Auth {
  constructor(options) {
    this.BASE_URL = options.BASE_URL;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  login(email, password) {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  }

  validateToken() {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...this.headers,
      },
    }).then(this._getResponseData);
  }
}

export default new Auth({
  BASE_URL: "https://api.mesto.social.nomoredomainsrocks.ru",
  headers: { "Content-Type": "application/json" },
});
