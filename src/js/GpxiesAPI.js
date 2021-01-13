class GpxiesAPI {
  constructor() {
    this.API_SERVER = "http://192.168.43.79:3003";
  }
  async userRegistration(userRegistrationData) {
    return fetch(this.API_SERVER + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegistrationData),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => Error(error));
  }
  async userLogin(userLogin) {
    return fetch(this.API_SERVER + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default GpxiesAPI;
