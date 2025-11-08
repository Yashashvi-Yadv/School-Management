# School Management System

This is a full-stack School Management System project, organized into `Client` (frontend) and `Server` (backend) folders. It supports features for administrators, teachers, and students, including authentication, attendance, and management of users and classes.

## Project Structure

```
Client/
  ├── src/
  │   ├── components/         # Reusable UI components (Header, Footer)
  │   ├── pages/              # Page views for Admin, Teacher, Student, Attendance, etc.
  │   ├── routes/             # Route definitions for different user roles
  │   └── utils/              # Utility components (Logout, ProtectedRoute)
  ├── public/                 # Static assets
  ├── index.html              # Main HTML file
  ├── main.jsx                # App entry point
  ├── package.json            # Frontend dependencies
  └── vite.config.js          # Vite configuration

Server/
  ├── gateway/                # API gateway for microservices
  ├── services/
  │   ├── Authentication-service/  # Auth microservice (login, signup)
  │   ├── Student-service/        # Student microservice (CRUD operations)
  │   ├── Teacher-service/        # Teacher microservice (CRUD operations)
  │   └── Attendance-service/     # Attendance microservice (tracking)
  └── package.json            # Backend dependencies
```

## Features

- **Authentication:** Login, signup, and protected routes for different user roles.
- **Admin Dashboard:** Manage teachers, students, assign classes/subjects, view attendance.
- **Teacher Dashboard:** Manage students, view and update attendance, CRUD operations.
- **Student Dashboard:** View personal details and attendance.
- **Attendance Management:** Mark and view attendance records.
- **Microservices Architecture:** Separate services for authentication, teachers, students, and attendance.

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express, Kafka (for service communication)
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js and npm installed
- Kafka server running (for service communication)

### Setup

#### Start Kafka (Required)

```powershell
# Start Zookeeper
bin\windows\zookeeper-server-start.bat config\zookeeper.properties

# Start Kafka Server (in a new terminal)
bin\windows\kafka-server-start.bat config\server.properties
```

#### Client

```powershell
cd Client
npm install
npm run dev
```

#### Server

```powershell
# Gateway
cd Server/gateway
npm install
node index.js

# Authentication Service
cd ../services/Authentication-service
npm install
node server.js

# Student Service
cd ../Student-service
npm install
node index.js

# Teacher Service
cd ../Teacher-service
npm install
node server.js

# Attendance Service
cd ../Attendance-service
npm install
node server.js
```

### Quick Start Script

Use the provided PowerShell script to start all services:

```powershell
.\run-all.ps1  # Starts all services in separate windows
# or
.\run-all-vscode.ps1  # Opens each service in VS Code
```

## Service Ports

- Gateway: `3000`
- Authentication Service: `5000`
- Student Service: `5001`
- Teacher Service: `5002`
- Frontend: `5173` (Vite default)

## API Routes

### Gateway Routes

- `/api/auth` → Authentication service
- `/api/student` → Student service
- `/api/teacher` → Teacher service
- `/api/attendance` → Attendance service

### Authentication Service

- `GET /api/auth/test` — Test endpoint
- `POST /api/auth/login` — User login
- `POST /api/auth/signin` — User registration
- `POST /api/auth/teacher/login` — Teacher login
- `POST /api/auth/student/login` — Student login

### Teacher Service

- `GET /api/teacher/test` — Test endpoint
- `POST /api/teacher/add` — Add teacher
- `GET /api/teacher/show` — Show all teachers
- `GET /api/teacher/get/:id` — Get teacher by ID
- `POST /api/teacher/update/:id` — Update teacher by ID
- `POST /api/teacher/delete/:id` — Delete teacher by ID
- `POST /api/teacher/assignclass/:id` — Assign class to teacher
- `POST /api/teacher/assignsubject/:id` — Assign subject to teacher

### Student Service

- `POST /api/student/get` — Get student(s)
- `GET /api/student/show` — Show all students
- `POST /api/student/add` — Add student
- `POST /api/student/delete` — Delete student
- `POST /api/student/update` — Update student
- `POST /api/student/getforattendence` — Get students for attendance

### Attendance Service

- `GET /` — Welcome message
- `POST /takeattendence` — Record attendance
- `POST /getattendence` — Retrieve attendance records
- `PUT /update` — Update attendance record
- `DELETE /delete` — Delete attendance record
- `POST /getatforstudent` — Get student's attendance

## Troubleshooting

### Common Issues

1. **Service Communication:** Ensure Kafka is running before starting services
2. **Authentication:** All protected routes require valid JWT token in Authorization header
3. **Case Sensitivity:** Use correct case in file paths (especially important for Linux deployments)
4. **Port Conflicts:** Ensure no other applications are using the designated ports

### Development Tips

- Use the provided scripts (`run-all.ps1` or `run-all-vscode.ps1`) for quick setup
- Check service logs for detailed error messages
- Ensure all environment variables are properly set
- Use consistent naming conventions across services

## Folder Details

- **Client/src/pages/static/**: Home, Login, Signup, TeacherLogin pages
- **Client/src/routes/**: Route components for different user roles
- **Server/services/Authentication-service/**: Auth logic, login/signup
- **Server/services/Student-service/**: Student CRUD operations
- **Server/services/Teacher-service/**: Teacher CRUD operations
- **Server/services/Attendance-service/**: Attendance tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
