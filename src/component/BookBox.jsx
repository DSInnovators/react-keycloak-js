import UserService from "../services/UserService";

const Welcome = () => (
  <div className="jumbotron">

      <div className="row">

          <h1>
              Hello {UserService.getUsername()}

          </h1>
      </div>

      <div className="row">
          <button className="btn btn-success" style={{ marginRight: 0 }} onClick={() => UserService.doLogout()}>
              Logout
          </button>

      </div>

  </div>
)

export default Welcome
