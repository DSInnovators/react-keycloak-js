import UserService from "../services/UserService";
import { useEffect } from "react";
import { sha256, sha224 } from 'js-sha256';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { v4 as uuidv4 } from 'uuid';



const Welcome = () => {
    useEffect(() => {

        const messageDigest = sha256('The quick brown fox jumps over the lazy dog');
        console.log('Message digest',messageDigest);

        const input = "akash";
        let encoded = base64_encode(input);
        console.log('Base64 encoded',encoded);

        const nonce = uuidv4();
        console.log('nonce',nonce);

    }, []);
    return (
  <div className="jumbotron">
    <h1>Hello Anonymous!</h1>
    <p className="lead">Please authenticate yourself!</p>
    <p>
      <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>
    </p>
  </div>
)}

export default Welcome
