Project Summary

Objective
This project is an application for BMI calculation and glucose screening, including both frontend and backend. The objective is to enable the registration, visualization, and deletion patient records,with functionalities for BMI calculation and fasting glucose screening, focusing on detecting high and low values, as both are health concerns.


Memória atualizada
Project Summary

Objective
This project is an application for BMI calculation and glucose screening, including both frontend and backend. The objective is to enable the registration, visualization, and deletion of problematic patient records, with functionalities for BMI calculation and fasting glucose screening, focusing on detecting high and low values, as both are health concerns.

Technologies Used
Backend: Java 17, Spring Boot, Lombok, Hibernate, Liquibase, PostgreSQL, Docker, JUnit.
Frontend: React, TypeScript, Styled-components, Material UI, Axios, React Internationalization, Jest.

How to Run the Project
 - Clone the project repository.
  - Ensure Docker is running.
  - In the backend, use the following commands:
 - `mvn clean install` to build the project.
 - `docker-compose up` to start the database.
 - docker ps to check running containers.
 - mvn spring-boot:run to start the project.
 - mvn test to run tests.

In the frontend, run the commands:
 - `yarn install` or `npm install` to install dependencies.
 - `yarn start` or `npm start` to start the development server.
 - yarn test to run tests.

 Access the application at `http://localhost:3000`.

Important Commands
- `mvn clean install`: Cleans and builds the backend project.
- `docker ps`: Checks the running Docker containers.
- `netstat -an | findstr <port>`: Checks if the port is in use.

Testing in Postman
2. In the body, use the JSON format to register patients (BMI or Glucose).
3. For GET requests, use `http://localhost:8080/api/cliente?tipo=imc` or `tipo=glicemia

Backend Commands:

mvn clean install to compile the project.
docker-compose up to start the database.
Frontend Commands:

