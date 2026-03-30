# Services - Enterprise Cloud Application (ECA) Business Services Layer

The Services layer contains all the business logic microservices for the Enterprise Cloud Application (ECA). These services handle core domain operations including student management, academic program management, and enrollment tracking.

## Student Information

| Field          | Value |
|----------------|---|
| Student Name   | J.G Himantha |
| Student Number | 2301692032 |
| Slack Handle   | Himantha j|
| Module         | ITS 2130 Enterprise Cloud Application |
| Program        | GDSE @ IJSE |
| GCP Project ID | capstone-project-490416 |

## About

This project is part of the **Enterprise Cloud Application (ECA)** module in the Higher Diploma in Software Engineering (GDSE) program at the Institute of Software Engineering (IJSE). It comprises three independent microservices that implement business logic for managing students, programs, and enrollment data in a distributed system architecture.

## Project Description

The Services layer implements a microservices-based architecture with three independent, scalable services that handle different business domains:

1. **Student-Service** - Manages student profiles, personal information, and profile pictures
2. **Program-Service** - Manages academic program information and curriculum details
3. **Enrollment-Service** - Manages student enrollments in programs and enrollment tracking

Each service:
- Operates independently with its own database
- Exposes RESTful APIs consumed through the API Gateway
- Registers itself with the Service-Registry (Eureka)
- Fetches configuration from the Config-Server
- Implements its own business logic and validation

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Java | 25 | Programming Language |
| Spring Boot | 4.0.3 | Framework for building microservices |
| Spring Cloud | 2025.1.0 | Cloud-native patterns (Eureka Client, Config Client) |
| Spring Cloud Netflix Eureka Client | Part of Cloud | Service registration and discovery |
| Spring Cloud Config Client | Part of Cloud | Centralized configuration retrieval |
| Spring Data JPA | Latest | ORM and database abstraction |
| Spring Web / REST | Latest | RESTful API development |
| Spring Validation | Latest | Bean and method-level validation |
| PostgreSQL | 15+ | Relational database for persistence |
| MapStruct | Latest | DTO to Entity mapping |
| Lombok | Latest | Boilerplate code reduction |
| Spring Boot Actuator | Latest | Health monitoring and metrics |
| GCP (Google Cloud Platform) | - | Cloud deployment and infrastructure |

## Services Overview

### 1. Student-Service (Port: 8000)

**Purpose:** Manage student records and profile information

**Key Features:**
- Create, read, update, and delete student records
- Store and retrieve student profile pictures
- Validate NIC (National ID Card) format
- Manage student contact information

**API Endpoints:**
- `POST /api/v1/students` - Create new student
- `GET /api/v1/students` - List all students
- `GET /api/v1/students/{nic}` - Get student by NIC
- `PUT /api/v1/students/{nic}` - Update student
- `DELETE /api/v1/students/{nic}` - Delete student
- `GET /api/v1/students/{nic}/picture` - Get profile picture

**Database:**
- PostgreSQL on port `12500`
- Database: `eca`
- Picture Storage: `~/.ijse/eca/students/`

**Tech Stack:**
- Spring Data JPA for persistence
- MapStruct for DTO mapping
- Multipart file upload handling
- Image file management

### 2. Program-Service (Port: 8001)

**Purpose:** Manage academic programs and curriculum information

**Key Features:**
- Create, read, update, and delete program records
- Manage program details (name, duration, credits)
- Track program curriculum and requirements
- Support for multiple program types

**API Endpoints:**
- `POST /api/v1/programs` - Create new program
- `GET /api/v1/programs` - List all programs
- `GET /api/v1/programs/{programId}` - Get program details
- `PUT /api/v1/programs/{programId}` - Update program
- `DELETE /api/v1/programs/{programId}` - Delete program

**Database:**
- PostgreSQL on port `12500`
- Database: `eca`
- Shares same database cluster as other services

**Tech Stack:**
- Spring Data JPA for persistence
- MapStruct for DTO mapping
- Domain-driven design patterns

### 3. Enrollment-Service (Port: 8002)

**Purpose:** Manage student enrollments in academic programs

**Key Features:**
- Create and manage student-program enrollments
- Track enrollment status and dates
- Generate enrollment reports
- Validate enrollment constraints

**API Endpoints:**
- `POST /api/v1/enrollments` - Create new enrollment
- `GET /api/v1/enrollments` - List all enrollments
- `GET /api/v1/enrollments/{enrollmentId}` - Get enrollment details
- `PUT /api/v1/enrollments/{enrollmentId}` - Update enrollment
- `DELETE /api/v1/enrollments/{enrollmentId}` - Delete enrollment
- `GET /api/v1/enrollments/student/{nic}` - Get student enrollments

**Database:**
- PostgreSQL on port `12500`
- Database: `eca`
- Maintains relationships with students and programs

**Tech Stack:**
- Spring Data JPA for complex queries
- MapStruct for DTO mapping
- Business logic validation

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                  API Gateway (Port 7000)                   │
│            Spring Cloud Gateway (WebFlux)                  │
└──────────────┬──────────────┬──────────────┬───────────────┘
               │              │              │
    ┌──────────▼──┐  ┌────────▼──┐  ┌──────▼───────┐
    │ /students/** │  │/programs/│  │/enrollments/│
    │              │  │     **   │  │     **      │
    └──────────────┘  └──────────┘  └─────────────┘
               │              │              │
    ┌──────────▼──────┐ ┌─────▼──────┐ ┌──────▼────────┐
    │  Student-Service│ │Program-Svc │ │Enrollment-Svc │
    │   (Port 8000)   │ │(Port 8001) │ │ (Port 8002)   │
    │                 │ │            │ │               │
    │ - PostgreSQL    │ │PostgreSQL  │ │ - PostgreSQL  │
    │ - JPA/Hibernate │ │- JPA/Hib   │ │ - JPA/Hib     │
    │ - File Storage  │ │            │ │               │
    └────────────────┘ └────────────┘ └───────────────┘
               │              │              │
               └──────────────┬───────────────┘
                              │
                    ┌─────────▼─────────┐
                    │ PostgreSQL (12500)│
                    │   Database: eca   │
                    └───────────────────┘
```

## Setup / Getting Started Instructions

### Prerequisites

- **Java 25** installed
- **Maven 3.9+** installed (or use bundled `./mvnw`)
- **PostgreSQL 15+** running on port `12500` with database named `eca`
- **Git** for version control
- **Config-Server** running on port `9000`
- **Service-Registry** running on port `9001`
- **Api-Gateway** running on port `7000` (optional for direct service calls)
- GCP account (for cloud deployment)

### Clone the Repository with Submodules

```bash
# Clone with all submodules
git clone --recursive https://github.com/Himanthajaga/Capstone-Project-Fully-with-GCP.git

# Or if already cloned, initialize submodules
cd Capstone-Project/Services
git submodule update --init --recursive
```

### Platform Startup Order (Must Complete First)

Before starting any business services, ensure the platform is running:

1. **Config-Server** (Port: 9000)
   ```bash
   cd Platform/Config-Server
   ./mvnw spring-boot:run
   ```

2. **Service-Registry** (Port: 9001)
   ```bash
   cd Platform/platform-registry
   ./mvnw spring-boot:run
   ```

3. **Api-Gateway** (Port: 7000) *(Optional but recommended)*
   ```bash
   cd Platform/Api-gateway
   ./mvnw spring-boot:run
   ```

### Database Setup

```bash
# Create PostgreSQL user (if not exists)
psql -U postgres
CREATE USER eca_user WITH PASSWORD 'your_password';

# Create database
CREATE DATABASE eca OWNER eca_user;

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE eca TO eca_user;
```

### Build All Services

```bash
# Navigate to Services directory
cd Services

# Build entire Services layer
mvn clean install

# Or build individual services
cd Student-Service && mvn clean install
cd ../program-Service && mvn clean install
cd ../Enrollment-Service && mvn clean install
```

### Startup Services (Must Start After Platform)

**Important:** Platform components must be running first!

```bash
# Terminal 1: Start Student-Service (Port 8000)
cd Services/Student-Service
./mvnw spring-boot:run

# Terminal 2: Start Program-Service (Port 8001)
cd Services/program-Service
./mvnw spring-boot:run

# Terminal 3: Start Enrollment-Service (Port 8002)
cd Services/Enrollment-Service
./mvnw spring-boot:run
```

### Expected Startup Order Summary

1. ✅ PostgreSQL (port 12500)
2. ✅ Config-Server (port 9000)
3. ✅ Service-Registry/Eureka (port 9001)
4. ✅ Student-Service (port 8000)
5. ✅ Program-Service (port 8001)
6. ✅ Enrollment-Service (port 8002)
7. ✅ Api-Gateway (port 7000) - *routes to services*
8. ✅ Frontend/Webapp - *connects via gateway*

## Accessing Services

### Direct Service Access (Development)

```bash
# Student-Service
curl http://localhost:8000/api/v1/students

# Program-Service
curl http://localhost:8001/api/v1/programs

# Enrollment-Service
curl http://localhost:8002/api/v1/enrollments
```

### Through API Gateway (Recommended)

```bash
# Student-Service
curl http://localhost:7000/api/v1/students

# Program-Service
curl http://localhost:7000/api/v1/programs

# Enrollment-Service
curl http://localhost:7000/api/v1/enrollments
```

## Verify Services Are Running

### Check Service Health

```bash
# Individual health checks
curl http://localhost:8000/actuator/health
curl http://localhost:8001/actuator/health
curl http://localhost:8002/actuator/health

# View all registered services in Eureka
curl http://localhost:9001/eureka/apps
```

### View Eureka Dashboard

Open browser to: `http://localhost:9001`http://34.126.186.15:9001/,<br/>http://34.124.176.187:9001/,<br/>http://34.158.34.135:9001/

You should see all three services listed as registered instances.

## Database Configuration

### PostgreSQL Connection Details

```
Host: localhost
Port: 12500
Database: eca
Username: eca_user (or your configured username)
Password: (configured in Config-Server)
```

### Create Required Tables

Tables are automatically created by Hibernate/JPA on first run. Ensure Hibernate DDL configuration is set to `create-drop` or `update`.

## Monitoring and Logs

### View Service Logs

```bash
# Using tail
tail -f logs/student-service-out.log
tail -f logs/program-service-out.log
tail -f logs/enrollment-service-out.log

# Or directly from console output in respective terminals
```

### Actuator Endpoints (Available on all services)

**Base URLs:**
- Student-Service: `http://localhost:8000/actuator`
- Program-Service: `http://localhost:8001/actuator`
- Enrollment-Service: `http://localhost:8002/actuator`

**Common Endpoints:**
- `/health` - Service health status
- `/metrics` - Application metrics
- `/env` - Environment properties
- `/beans` - Spring beans information
- `/threaddump` - Thread dump

## PM2 Process Management

```bash
# Start all services with PM2
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

## Testing APIs

### Using Postman

Comprehensive Postman collection available:
- [ECA Services Collection](https://www.postman.com/ijse-eca-5768309/workspace/eca-69-70/collection)

### Sample API Calls

#### Create Student
```bash
curl -X POST http://localhost:7000/api/v1/students \
  -F "nic=123456789V" \
  -F "name=John Doe" \
  -F "address=123 Main St" \
  -F "mobile=0771234567" \
  -F "email=john@example.com" \
  -F "picture=@/path/to/picture.jpg"
```

#### Create Program
```bash
curl -X POST http://localhost:7000/api/v1/programs \
  -H "Content-Type: application/json" \
  -d '{
    "programId": "GDSE-001",
    "programName": "GDSE",
    "duration": 24,
    "credits": 120
  }'
```

#### Create Enrollment
```bash
curl -X POST http://localhost:7000/api/v1/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentNic": "123456789V",
    "programId": "GDSE-001",
    "enrollmentDate": "2026-03-22"
  }'
```

## GCP Deployment

### Deploy to Google Cloud Platform

```bash
# Build service JAR files
mvn clean install

# Deploy using gcloud CLI
gcloud app deploy

# Or manually deploy to Compute Engine instances
gcloud compute instances create instance-name \
  --image=ubuntu-2204-lts \
  --zone=asia-southeast1-a
```

### GCP Project Configuration

- **Project ID:** capstone-project-490416
- **Region:** asia-southeast1 (Singapore)
- **Zones:** asia-southeast1-a, asia-southeast1-b, asia-southeast1-c
- **Auto-scaling:** Configured with minimum 2 and maximum 5 instances per service
- **Health Checks:** Configured on `/actuator/health` endpoints

## Troubleshooting

### Service Won't Register with Eureka

```
Issue: Service appears offline in Eureka
Solution:
1. Check Config-Server is running: curl http://localhost:9000
2. Check Service-Registry is running: curl http://localhost:9001
3. Verify network connectivity between services
4. Check service logs for configuration errors
```

### Database Connection Timeout

```
Issue: "Connection timeout" in logs
Solution:
1. Verify PostgreSQL is running: psql -U postgres
2. Check port 12500 is correct: netstat -an | grep 12500
3. Verify database 'eca' exists: psql -l
4. Check credentials in Config-Server
```

### API Gateway Can't Route to Services

```
Issue: 503 Service Unavailable when calling through gateway
Solution:
1. Verify all services are registered in Eureka
2. Check service health endpoints
3. Verify routing configuration in Api-Gateway
4. Check gateway logs for routing errors
```

### Port Already in Use

```
Issue: "Address already in use"
Solution:
# Find process using port
lsof -i :8000
# Kill process
kill -9 <PID>
# Or use different port in configuration
```

## Individual Service Documentation

Each service has detailed documentation:

- **Student-Service:** [README](./Student-Service/README.md)
- **Program-Service:** [README](./program-Service/README.md)
- **Enrollment-Service:** [README](./Enrollment-Service/README.md)

For detailed API specifications, request body schemas, and database models, refer to individual service README files.

## Architecture & Design

### Service Communication

- **Synchronous:** RESTful HTTP calls (when needed)
- **Discovery:** Service-Registry (Eureka)
- **Configuration:** Config-Server
- **API Gateway:** Central routing point

### Data Isolation

- Each service has access to the same PostgreSQL database
- Logical separation through different tables and schemas
- Each service owns its data models and operations

### Scalability

- Horizontal scaling: Multiple instances of each service
- Load balancing: Through API Gateway
- Auto-scaling: Configured in GCP with metrics

## Contributing

This project is a capstone project for IJSE students. Modifications should follow project requirements and academic guidelines.

## Support & Questions

If you encounter any issues:

1. Check the troubleshooting section
2. Review individual service README files
3. Check [Architecture Documentation](../docs/architecture.md)
4. Contact via Slack workspace (IJSE ECA Community)

## License

This project is part of the IJSE curriculum and is intended for educational purposes only.

---

**Last Updated:** March 2026
**Module:** ITS 2130 - Enterprise Cloud Application
**Status:** Production Ready

