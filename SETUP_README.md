# CampusBridge Project - Setup Guide

CampusBridge is a web application that connects students with volunteer opportunities and campus activities. The project consists of a React frontend client and a GraphQL backend server with MongoDB as the database.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite (Client)
- **Backend**: Node.js + Express + GraphQL (Server)
- **Database**: MongoDB (via Docker)
- **Authentication**: Passport.js with sessions

## 📋 Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CampusBridge-Project
```

### 2. Start the Database

First, start the MongoDB database using Docker Compose:

```bash
docker-compose up -d
```

This will start a MongoDB container with:

- Port: `27017`
- Username: `root`
- Password: `pw`
- Database: `auth`

### 3. Install Server Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: We use `--legacy-peer-deps` because the project uses older versions of GraphQL that have peer dependency conflicts with newer Apollo Client versions.

### 4. Install Client Dependencies

```bash
cd client
npm install
cd ..
```

### 5. Start the Development Servers

#### Option A: Start Both Servers Simultaneously (Recommended)

**Terminal 1 - Start the GraphQL Server:**

```bash
npm run dev
```

**Terminal 2 - Start the Client:**

```bash
cd client
npm run dev
```

#### Option B: Use the npm scripts individually

**Server (GraphQL API):**

```bash
npm run dev
```

**Client (React App):**

```bash
cd client
npm run dev
```

## 🌐 Access Points

Once both servers are running, you can access:

- **Frontend Application**: http://localhost:5000
- **GraphQL Playground**: http://localhost:4000/graphql
- **GraphQL API**: http://localhost:4000/graphql

## 📁 Project Structure

```
CampusBridge-Project/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/       # Images, icons, etc.
│   │   └── GraphQL/      # GraphQL queries and mutations
│   ├── public/           # Static assets
│   ├── package.json      # Client dependencies
│   └── vite.config.ts    # Vite configuration
├── server/               # Backend GraphQL server
│   ├── models/          # MongoDB models
│   ├── schema/          # GraphQL schema definitions
│   ├── services/        # Authentication and other services
│   └── server.js        # Express server configuration
├── docker-compose.yaml   # MongoDB container configuration
├── package.json         # Server dependencies
└── index.js            # Server entry point
```

## 🔧 Configuration

### Environment Variables

The project uses the following configuration:

**Database Connection:**

- MongoDB URI: `mongodb://root:pw@localhost:27017/auth?authSource=admin`

**Server Ports:**

- GraphQL Server: `4000`
- Client Development Server: `5000`

**CORS Configuration:**

- Allowed Origin: `http://localhost:5000`
- Credentials: `true`

### Authentication

The application uses:

- **Passport.js** for authentication
- **Express sessions** stored in MongoDB
- **bcrypt** for password hashing

## 🛠️ Development Workflow

### Making Changes

1. **Frontend Changes**: The Vite development server will automatically reload when you make changes to files in the `client/` directory.

2. **Backend Changes**: The server uses `nodemon` which automatically restarts when you make changes to server files.

### Database Management

- **View Database**: You can connect to MongoDB using any MongoDB client with the connection string: `mongodb://root:pw@localhost:27017/auth?authSource=admin`
- **Reset Database**: Stop the Docker container and remove the volume:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

## 🐛 Troubleshooting

### Common Issues

1. **Dependency Conflicts**

   - If you encounter GraphQL version conflicts, use: `npm install --legacy-peer-deps`

2. **MongoDB Connection Issues**

   - Ensure Docker is running: `docker ps`
   - Check if the container is healthy: `docker-compose logs mongo`

3. **Port Already in Use**

   - Server (4000): `lsof -ti:4000 | xargs kill -9`
   - Client (5000): `lsof -ti:5000 | xargs kill -9`

4. **Node Modules Issues**
   - Clear and reinstall:
     ```bash
     rm -rf node_modules package-lock.json
     npm install --legacy-peer-deps
     ```

### Build for Production

To build the client for production:

```bash
cd client
npm run build
```

The built files will be in `client/dist/` and are served by the Express server when not in development mode.

## 📚 Additional Information

### GraphQL Schema

The GraphQL API includes:

- **User Management**: Registration, login, authentication
- **Opportunities**: CRUD operations for volunteer opportunities
- **Contact**: Contact form submissions

### Key Dependencies

**Server:**

- `express`: Web server framework
- `express-graphql`: GraphQL HTTP server middleware
- `mongoose`: MongoDB object modeling
- `passport`: Authentication middleware
- `bcrypt-nodejs`: Password hashing

**Client:**

- `react`: Frontend library
- `@apollo/client`: GraphQL client
- `react-router-dom`: Routing
- `framer-motion`: Animations
- `vite`: Build tool and development server

## 🤝 Contributing

1. Make sure the development environment is set up correctly
2. Create a new branch for your feature
3. Make your changes
4. Test both frontend and backend functionality
5. Submit a pull request

---

For more detailed information about specific features or components, refer to the individual README files in the `client/` directory or explore the GraphQL schema at http://localhost:4000/graphql.
