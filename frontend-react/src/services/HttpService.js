import axios from "axios";
import UserService from "./UserService";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const _axios = axios.create();

_axios.interceptors.request.use((config) => {

  if (UserService.isLoggedIn()) {

    const access_token = Cookies.get('access_token');
    console.log('External Token (IDP)',access_token);
    console.log(JSON.stringify(jwt_decode(access_token)))


    console.log('Access token (BROKER)',UserService.getToken());
    console.log(JSON.stringify(jwt_decode(UserService.getToken())))

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
