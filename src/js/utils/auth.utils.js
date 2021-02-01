const { default: GpxiesAPI } = require('../GpxiesAPI');

class Auth {
  constructor() {
    this.checkAuth();
  }

  async checkAuth() {
    console.log('AUTH');
    const gpxiesAPI = new GpxiesAPI();
    const result = await gpxiesAPI.whoami();
    if (result.ok) {
      return true;
    }
    return false;
  }
}
export default Auth;
