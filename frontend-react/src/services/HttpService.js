import axios from "axios";
import UserService from "./UserService";
import Cookies from 'js-cookie';

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const _axios = axios.create();

_axios.interceptors.request.use((config) => {
  console.log('using interceptor: login',UserService.isLoggedIn());
  if (UserService.isLoggedIn()) {

    const access_token = Cookies.get('access_token');
    console.log('Token',access_token)

    const cb = () => {
      /*config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      config.headers.ContentType = 'application/json';*/
      config.headers = {
        'Authorization': `Bearer ${Cookies.get('access_token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});

const getAxiosClient = () => _axios;

const HttpService = {
  HttpMethods,
  //configure,
  getAxiosClient,
};

export default HttpService;
