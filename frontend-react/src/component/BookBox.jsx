import UserService from "../services/UserService";
import Menu from "./Menu";
import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import HttpService from "../services/HttpService";
import Akash from "./akash";
import jwt_decode from "jwt-decode";

const LIST_STUDENTS = 'http://localhost:7070/user/hello';
const LIST_ADMINS = 'http://localhost:7070/admin/hello';

const Welcome = () => {


    useEffect(() => {

        console.log(JSON.stringify(jwt_decode(UserService.getToken())))
    }, []);

    const getStudentData = async ()=>{
        console.log('Cookie created name : user ');

       // UserService.fetchIdpToken();


       HttpService.getAxiosClient().get(LIST_STUDENTS)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                    alert('You are not authorize to view the content')
                    console.log("Error occured " + error)
                }
            )

       /* const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  session.accessToken
            }
        }

        await axios.get(BASE_URL_STUDENT,config)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                    alert('You are not authorize to view the content')
                    console.log("Error occured " + error)
                }
            )*/
    }

    const getAdminData = async ()=>{
        console.log('Cookie created name : user ');


        HttpService.getAxiosClient().get(LIST_ADMINS)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                    alert('You are not authorize to view the content')
                    console.log("Error occured " + error)
                }
            )

        /* const config = {
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' +  session.accessToken
             }
         }

         await axios.get(BASE_URL_STUDENT,config)
             .then(res => {
                 console.log(res);
             })
             .catch(error => {
                     alert('You are not authorize to view the content')
                     console.log("Error occured " + error)
                 }
             )*/
    }

  return <div className="jumbotron">

      <Menu/>

      <Switch>
          <Route exact path="/">
              {/*<BookList/>*/}
              List of books
              <div>

                  <pre> {JSON.stringify(jwt_decode(UserService.getToken()))} </pre>
              </div>



              <button
                  type="button"
                  className="btn btn-primary"
                  onClick={getStudentData}>
                  GetStudentData
              </button>

              <button
                  type="button"
                  className="btn btn-danger"
                  onClick={getAdminData}>
                  getAdminData
              </button>

          </Route>
          <Route exact path="/books/new">
              {/*<BookForm/>*/}
              New book path
          </Route>


          <Route exact path="/akash">
              {/*<BookForm/>*/}
             <Akash/>
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


}

export default Welcome
