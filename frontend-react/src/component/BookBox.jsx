import UserService from "../services/UserService";
import Menu from "./Menu";
import React from "react";
import { Route, Switch } from "react-router-dom";

const Welcome = () => (
  <div className="jumbotron">

      <Menu/>

      <Switch>
          <Route exact path="/">
              {/*<BookList/>*/}
              List of books
          </Route>
          <Route exact path="/books/new">
              {/*<BookForm/>*/}
              New book path
          </Route>
          {/*<Route path="/books/:bookId">
              <BookDetails/>
          </Route>
          <RolesRoute path="/secret" roles={['admin']}>
              <SecretBooks/>
          </RolesRoute>*/}
          <Route path="*">
              {/*<NoMatch/>*/}
              No path
          </Route>
      </Switch>


      {/*<div className="row">

          <h1>
              Hello {UserService.getUsername()}

          </h1>
      </div>

      <div className="row">
          <button className="btn btn-success" style={{ marginRight: 0 }} onClick={() => UserService.doLogout()}>
              Logout
          </button>

      </div>*/}

  </div>
)

export default Welcome
