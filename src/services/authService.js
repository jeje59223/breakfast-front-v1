import axios from '../axiosConfig';

class AuthService {
  login(user) {
    return axios.post('/accounts/login', {
      username: user.username,
      password: user.password
    });
  }
}

export default new AuthService();
