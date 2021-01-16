class GpxiesAPI {
  constructor() {
    this.API_SERVER = "https://api.gpxies.ru";
  }
  async userRegistration(userRegistrationData) {
    return fetch(this.API_SERVER + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        "Referer": "https://api.gpxies.ru"
      },
      body: JSON.stringify(userRegistrationData),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData)=>{
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async userLogin(userLogin) {
    return fetch(this.API_SERVER + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        "Referer": "https://api.gpxies.ru"
      },
      body: JSON.stringify(userLogin),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData)=>{
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async tracksDataUpload(tracksData) {
    return fetch(this.API_SERVER + "/tracks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        "Referer": "https://api.gpxies.ru",
        "Authorization": "Bearer "+ localStorage.getItem("gpxiesToken")
      },
      body: JSON.stringify(tracksData),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData)=>{
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async tracksFileUpload(tracksFile) {}
  
}
export default GpxiesAPI;
