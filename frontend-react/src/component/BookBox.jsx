import UserService from "../services/UserService";
import Menu from "./Menu";
import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import HttpService from "../services/HttpService";
import Akash from "./akash";

const LIST_STUDENTS = 'http://localhost:8080/student/all';
const LIST_ADMINS = 'http://localhost:8080/admin/all';

const Welcome = () => {
    const getStudentData = async ()=>{
        console.log('Cookie created name : user ');


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
