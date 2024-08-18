import axios from '../axiosConfig';

class AuthService {
  login(user) {
    return axios.post('/accounts/login', {
      username: user.username,
      password: user.password
    });
  }
  logout() {
    return axios.get('/accounts/logout')
}
}

export default new AuthService();
