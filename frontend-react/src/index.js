import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RenderOnAnonymous from "./component/RenderOnAnonymous";
import RenderOnAuthenticated from "./component/RenderOnAuthenticated";
import Welcome from "./component/Welcome";
import BookBox from "./component/BookBox";
import UserService from "./services/UserService";

const renderApp = () => ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
UserService.initKeycloak(renderApp);