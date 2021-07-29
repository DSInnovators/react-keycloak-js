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

const doLogin = () => {
  return _kc.login({idpHint:'keycloak-dhaka'});
}

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>{
  console.log('updateToken');
  return _kc.updateToken(5)
      .then(successCallback)
      .catch(doLogin);
}


const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));


const hasClientRole = (role) => {
  //console.log('_kc.clientId',_kc.clientId);
  return _kc.hasResourceRole(role);
}

const  tokenExpired =_kc.onTokenExpired = () => {
  console.log('token expired!: previous token', _kc.token);

  _kc.updateToken(5).then((response) => {
    console.log('response',response);
    if (response) {
      console.log('successfully get a new token', _kc.token);
    } /*else {
      throw new Error('Something went wrong ...');
    }*/
  }).catch( err => {
    console.log('400 response form server',err);
   doLogout()
  });

  /*
    if(window.confirm('Do you want to keep login')){

      try {

        _kc.updateToken(5).then((response) => {
          console.log('response',response);
          if (response) {
            console.log('successfully get a new token', _kc.token);
          } else {
            throw new Error('Something went wrong ...');
          }
        }).catch( err => {
            console.log('400 response form server',err);
           // doLogout();
        });
      }catch (e) {
        console.log('err in try catch',e);
        //doLogout();
      }
    }else {
      console.log('User log out selected');
      //doLogout();
    }*/

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
  hasClientRole
};

export default UserService;
