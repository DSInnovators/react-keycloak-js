# react-keycloak-js

## KEYCLOAK FOLDERS
1. Go to keycloak folders
2. To start run

sudo docker build -t <NAME OF CONTAINER> .
 
## 8000 and 8001 for keycloak and keycloak-2 respectively and 8002 for keycloak-broker  
sudo docker run -dp <PORT AS DEFINED ABOVE>:8080 <NAME OF CONTAINER>

3. To stop the docker container

sudo docker stop $(sudo docker ps -q --filter ancestor='<NAME OF CONTAINER>' )

## REACT JS
1. Go to react folder
2. npm i
3. npm start dev

## Spring boot
1. Go to spring boot
2. mvn clean install
3. mvn spring-boot:run
