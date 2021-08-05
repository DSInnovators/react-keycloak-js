import UserService from "../services/UserService";
import Menu from "./Menu";
import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import HttpService from "../services/HttpService";
import Akash from "./akash";
import jwt_decode from "jwt-decode";

import { sha256, sha224 } from 'js-sha256';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";

const _axios = axios.create();
const LIST_STUDENTS = 'http://localhost:7070/user/hello';
const LIST_ADMINS = 'http://localhost:7070/admin/hello';

const Welcome = () => {


    const account_linking = () =>{
         const  clientId = jwt_decode(UserService.getToken()).azp;
        //const  clientId = 'dhaka-client';
        console.log('Clientid',clientId);

        //const nonce = uuidv4();
        const nonce = jwt_decode(UserService.getToken()).nonce;
        console.log('nonce',nonce);

        //session_state
        const  session_state = jwt_decode(UserService.getToken()).session_state;
        console.log('session_state',session_state);

        const  provider = 'keycloak-dhaka';
        console.log('provider',provider);

        const input = nonce + session_state + clientId + provider;
        console.log('input',input);
        // console.log(JSON.stringify(jwt_decode(UserService.getToken())))


        const messageDigest = sha256(input);
        console.log('Message digest',messageDigest);


        let encoded = base64_encode(messageDigest);
        console.log('Base64 encoded',encoded);

        //let redirect_uri = 'http://localhost:3000';
        let redirect_uri = 'http%3A%2F%2Flocalhost%3A3000';
        console.log('redirect_uri',redirect_uri);

        const query_param = 'client_id=' +clientId +'&redirect_uri='+redirect_uri + '&nonce=' + nonce +'&hash='+messageDigest;

        //http://localhost:8000/auth/realms/BANBEIS-BROKER/broker/keycloak-dhaka/link?client_id=dhaka-client&redirect_uri=http%3A%2F%2F192.168.31.80%3A3000&nonce=84143699-9f3f-4661-ac3e-e029d450f2fa&hash=b103d71e9d5d121af5025a290f3e08c3152adaafc964b03afe6711ad9ce23fd2
        // /{auth-server-root}/auth/realms/{realm}/broker/{provider}/link?client_id={id}&redirect_uri={uri}&nonce={nonce}&hash={hash}
        const url = 'http://localhost:8000/auth/realms/BANBEIS-BROKER/broker/keycloak-dhaka/link' + "?" + query_param ;
        console.log('url');
        console.log(url);

        _axios.get(url,{
           // crossorigin: true,
            headers: {
                'Authorization': 'Bearer ' + UserService.getToken(),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain',

            }}
        ).then(res => {
            console.log(res);

            if(res.status == 200) {
                const access_token = res.data.access_token;
                console.log(res.data.access_token);
                Cookies.set('access_token', access_token, { expires: 7, path: '' })
            }

        }).catch(error => {
                //alert('You are not authorize to view the content')
                console.log("Error occured " + error)
            }
        )

        //window.location.replace(url)
    }


    useEffect(() => {





    }, []);

    const getUserData = async ()=>{
       // console.log('Cookie created name : user ');

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
                  onClick={account_linking}>
                  GetUserData
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
