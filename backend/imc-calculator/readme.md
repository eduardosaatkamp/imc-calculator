Triage System Backend
This is the backend of the IMC and Glucose Triage System, developed in Java with Spring Boot. It
uses Liquibase for database migration management and PostgreSQL for data storage.
Technologies Used
- Java 17 or later
- Spring Boot 3.3.4
- Hibernate
- Liquibase
- PostgreSQL (in Docker)
- Maven
  How to Run the Project
  Prerequisites
- Ensure you have Java 17 or later installed.
- Have Docker and PostgreSQL running.
  Steps to Start the Backend
1. Clone the repository:
   git clone <REPOSITORY_URL>
   cd backend
2. Start the PostgreSQL container (if not running):
   docker-compose up -d
3. Check if the container is running:
   docker ps
4. Install Maven dependencies and clean the project:
   mvn clean install
5. Start the server:
   mvn spring-boot:run
   Testing with Postman
   Available Endpoints
- Create Client (IMC or Glucose):
  URL: http://localhost:8080/api/cliente
  Method: POST
- List Clients (IMC or Glucose):
  URL: http://localhost:8080/api/cliente?tipo=imc or /?tipo=glicemia
  Method: GET
  Useful Commands
- Compile and install the project: mvn clean install
- Check running containers: docker ps
- Check if port 8080 is occupied: netstat -an | findstr :8080
- View project logs in real-time: mvn spring-boot:ru