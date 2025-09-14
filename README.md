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
  │   ├── Authentication-service/ # Auth microservice (login, signup, teacher management)
  │   ├── Student-service/        # Student microservice (CRUD operations)
  │   └── Teacher-service/        # Teacher microservice (CRUD operations)
  └── package.json            # Backend dependencies
```

## Features

- **Authentication:** Login, signup, and protected routes for different user roles.
- **Admin Dashboard:** Manage teachers, students, assign classes/subjects, view attendance.
- **Teacher Dashboard:** Manage students, view and update attendance, CRUD operations.
- **Student Dashboard:** View personal details and attendance.
- **Attendance Management:** Mark and view attendance records.
- **Microservices Architecture:** Separate services for authentication, teachers, and students, connected via an API gateway.

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express, Kafka (for service communication)
- **Database:** (Assumed MongoDB or similar, based on typical Node.js setups)

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

#### Client

```powershell
cd Client
npm install
npm run dev
```

#### Server

```powershell
cd Server/gateway
npm install
node index.js

# For each microservice:
cd ../services/Authentication-service
npm install
node server.js

cd ../Student-service
npm install
node index.js

cd ../Teacher-service
npm install
node server.js
```

### Access

- Frontend: [http://localhost:5173](http://localhost:5173) (default Vite port)
- Backend: API endpoints exposed via gateway and microservices

## API Routes

### Gateway

- `/api/auth` → Authentication service
- `/api/student` → Student service
- `/api/teacher` → Teacher service

### Example Endpoints

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

Refer to each microservice's route files for more detailed endpoints and request/response formats.

## Folder Details

- **Client/src/pages/static/**: Home, Login, Signup, TeacherLogin pages
- **Client/src/routes/**: Route components for different user roles
- **Server/services/Authentication-service/**: Auth logic, teacher management
- **Server/services/Student-service/**: Student CRUD operations
- **Server/services/Teacher-service/**: Teacher CRUD operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
