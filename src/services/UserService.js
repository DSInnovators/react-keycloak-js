import Keycloak from "keycloak-js";

const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    //onLoad: 'login-required',
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      // if (authenticated) {
      onAuthenticatedCallback();
      // } else {
      //   doLogin();
      // }
    })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const  tokenExpired =_kc.onTokenExpired = () => {
  console.log('token expired!: previous token', _kc.token);

  if(window.confirm('Do you want to keep login')){

    try {

      _kc.updateToken(5).then((response) => {
        console.log('response');
        if (response.ok) {
          console.log('successfully get a new token', _kc.token);
        } else {
          throw new Error('Something went wrong ...');
        }
      }).catch( err => {
          console.log('updateToken',err);
          doLogout();
      });
    }catch (e) {
      console.log('err',e);
    }

  }else {
    doLogout();
  }

}

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  //tokenExpired
};

export default UserService;
