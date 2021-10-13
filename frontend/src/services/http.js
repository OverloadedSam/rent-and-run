import axios from 'axios';
import auth from './authService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common = { Authorization: `Bearer ${auth.getAuthToken()}` };

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
