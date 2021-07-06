### Npm dependencies
npx create-react-app react-keycloak-js

npm i keycloak-js@13.0.0

npm i react-router-dom

### Commands 
1. Go to keycloak folder
2. To start run

sudo docker build -t my-keycloak .
 
sudo docker run -dp 8000:8080 my-keycloak

3. To stop the docker container

sudo docker stop $(sudo docker ps -q --filter ancestor='my-keycloak' )

### Questions
1. Refresh token flow?

User will not know. After token expiration 
new request to access token by axios interceptor 
and api call will be placed.
