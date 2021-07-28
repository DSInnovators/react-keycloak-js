import axios from "axios";
import UserService from "./UserService";

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

    console.log('Token',UserService.getToken())

    const cb = () => {
      /*config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      config.headers.ContentType = 'application/json';*/
      config.headers = {
        'Authorization': `Bearer ${UserService.getToken()}`,
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
