import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RenderOnAnonymous from "./component/RenderOnAnonymous";
import RenderOnAuthenticated from "./component/RenderOnAuthenticated";
import Welcome from "./component/Welcome";
import BookBox from "./component/BookBox";

ReactDOM.render(
  <React.StrictMode>
      {/*
    <App />*/}
      <div className="container">
          <RenderOnAnonymous>
              <Welcome/>
          </RenderOnAnonymous>
          <RenderOnAuthenticated>
              <BookBox/>
          </RenderOnAuthenticated>
      </div>

  </React.StrictMode>,
  document.getElementById('root')
);
