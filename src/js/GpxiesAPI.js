class GpxiesAPI {
  constructor() {
    // this.API_SERVER = 'https://api.gpxies.ru';
    this.API_SERVER = 'http://127.0.0.1:3003';
  }
  /*  Users   */
  async userRegistration(userRegistrationData) {
    return fetch(this.API_SERVER + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
      },
      body: JSON.stringify(userRegistrationData),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async userLogin(userLogin) {
    return fetch(this.API_SERVER + '/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
      },
      body: JSON.stringify(userLogin),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async getUserInfo(id) {
    return fetch(this.API_SERVER + '/users/id/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
  async whoami() {
    return fetch(this.API_SERVER + '/users/whoami', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => error);
  }

  /* Tracks */
  async uploadTrack(file) {
    return fetch(this.API_SERVER + '/tracks/upload', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
        'Access-Control-Max-Age': '7200',
      },
      body: new FormData(file),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async tracksDataUpload(tracksData) {
    return fetch(this.API_SERVER + '/tracks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
        // "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Headers': 'origin, content-type, accept'
      },
      body: JSON.stringify(tracksData),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async getAllTracks() {
    return fetch(this.API_SERVER + '/tracks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async getUserTracksById(id) {
    return fetch(this.API_SERVER + '/tracks/username/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((error) => Error(error));
  }
  async getTrackById(id) {
    return fetch(this.API_SERVER + '/tracks/id/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
  async deleteTrackById(tracksToDelete) {
    return (
      fetch(this.API_SERVER + '/tracks/delete', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
          Referer: 'https://api.gpxies.ru',
          Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
        },
        body: JSON.stringify(tracksToDelete),
      })
        .then((response) => {
          console.log('response', response);
          return response;
        })
        /*.then((jsonData) => {
      return jsonData;
    })*/
        .catch((error) => Error(error))
    );
  }
  async getTrackPoints(hashString) {
    return fetch(this.API_SERVER + '/tracks/points/' + hashString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: 'https://api.gpxies.ru',
        Authorization: 'Bearer ' + localStorage.getItem('gpxiesToken'),
      },
    })
      .then((response) => {
        // console.log('RSP', response);
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default GpxiesAPI;
