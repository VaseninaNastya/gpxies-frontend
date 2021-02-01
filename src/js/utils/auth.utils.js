const { default: GpxiesAPI } = require('../GpxiesAPI');

class Auth {
  constructor() {
    // this.checkAuth();
  }

  async checkAuth() {
    const gpxiesAPI = new GpxiesAPI();
    let result = await gpxiesAPI.whoami();
    console.log(result);
    if (result.ok) {
      console.log('Auth OK');
      return true;
    } else {
      console.log('Auth NOT Ok');
      return false;
    }
  }
}
export default Auth;
