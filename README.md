Project Summary

Objective
This project is a complete application for BMI calculation and glucose screening, including frontend
and backend. The objective is to enable the registration and viewing of patient data, with calculation
and screening functionalities.

Technologies Used
- Backend: Java 17, Spring Boot, Hibernate, Liquibase, PostgreSQL (Docker)
- Frontend: React, TypeScript, Styled-components, Bootstrap, Axios

How to Run the Project
1. Clone the project repository.
2. Ensure Docker is running.
3. In the backend, use the following commands:
 - `mvn clean install` to build the project.
 - `docker-compose up` to start the database.
4. In the frontend, run the commands:
 - `yarn install` or `npm install` to install dependencies.
 - `yarn start` or `npm start` to start the development server.
5. Access the application at `http://localhost:3000`.
Important Commands
- `mvn clean install`: Cleans and builds the backend project.
- `docker ps`: Checks the running Docker containers.
- `netstat -an | findstr <port>`: Checks if the port is in use.
- `yarn install` or `npm install`: Installs frontend dependencies.
- `yarn start` or `npm start`: Starts the frontend.
- `docker-compose down`: Stops and removes the Docker containers.

Testing in Postman
2. In the body, use the JSON format to register patients (BMI or Glucose).
3. For GET requests, use `http://localhost:8080/api/cliente?tipo=imc` or `tipo=glicemia
