# react-keycloak-js

## KEYCLOAK
1. Go to keycloak folder
2. To start run

sudo docker build -t my-keycloak .
 
sudo docker run -dp 8000:8080 my-keycloak

3. To stop the docker container

sudo docker stop $(sudo docker ps -q --filter ancestor='my-keycloak' )

## REACT JS
1. Go to react folder
2. npm i
3. npm start dev

## Spring boot
1. Go to spring boot
2. mvn clean install
3. mvn spring-boot:run


## RND FOR Client credential
https://www.baeldung.com/spring-boot-react-crud
