import UserService from "../services/UserService";

const Welcome = () => (
  <div className="jumbotron">
    <h1>
        Hello {UserService.getUsername()}
    </h1>
  </div>
)

export default Welcome
