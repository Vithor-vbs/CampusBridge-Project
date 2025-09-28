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

### Option A: Automated Setup (Recommended)

```bash
git clone <repository-url>
cd CampusBridge-Project
./setup.sh
```

The setup script will:

- ✅ Verify system requirements
- 🐳 Start MongoDB database
- 📦 Install all dependencies with exact versions
- 🔧 Validate the installation

### Option B: Manual Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd CampusBridge-Project
```

#### 2. Verify Prerequisites

- **Node.js**: v16+ (recommended: use the version in `.nvmrc`)
- **Docker**: For MongoDB database
- **npm**: v8+ (comes with Node.js)

```bash
# If using nvm (recommended)
nvm use

# Check versions
node --version  # Should be 16+
docker --version
```

#### 3. Start the Database

```bash
docker-compose up -d
```

#### 4. Install Dependencies

```bash
# Install server dependencies (exact versions)
npm ci

# Install client dependencies (exact versions)
cd client
npm ci
cd ..
```

> **Important**: Use `npm ci` instead of `npm install` to ensure exact version matching and prevent dependency conflicts.

#### 5. Start the Development Servers

**Terminal 1 - GraphQL Server:**

```bash
npm run dev
```

**Terminal 2 - React Client:**

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

## � Dependency Management

This project uses **exact version locking** to prevent dependency conflicts:

- **Server**: All dependencies use exact versions (no `^` or `~`)
- **Client**: All dependencies use exact versions (no `^` or `~`)
- **Node.js**: Specified in `.nvmrc` and `package.json` engines field
- **Install**: Always use `npm ci` instead of `npm install`

### Why Exact Versions?

- ✅ **Consistency**: All developers get identical dependency versions
- ✅ **Stability**: Prevents breaking changes from minor updates
- ✅ **Compatibility**: Ensures GraphQL versions match between client/server
- ✅ **Reproducibility**: Builds are identical across environments

## �🛠️ Development Workflow

### Making Changes

1. **Frontend Changes**: The Vite development server will automatically reload when you make changes to files in the `client/` directory.

2. **Backend Changes**: The server uses `nodemon` which automatically restarts when you make changes to server files.

3. **Dependency Updates**:

   ```bash
   # Check outdated packages
   npm outdated

   # Update specific package (test thoroughly!)
   npm install package-name@latest

   # Update package.json to use exact version
   # Remove ^ or ~ from version number
   ```

### Database Management

- **View Database**: You can connect to MongoDB using any MongoDB client with the connection string: `mongodb://root:pw@localhost:27017/auth?authSource=admin`
- **Reset Database**: Stop the Docker container and remove the volume:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

## 🐛 Troubleshooting

### Common Issues

1. **"npm ci" Lock File Sync Error**

   - **Issue**: `package-lock.json` and `package.json` are out of sync
   - **Solution**: The setup script now automatically handles this by regenerating lock files
   - **Manual fix**: Delete lock files and run `npm install` instead of `npm ci`

2. **"req.logIn is not a function" Error**

   - ✅ **Fixed**: This was caused by incorrect GraphQL context configuration
   - The server now properly passes the Express request object to GraphQL resolvers

3. **GraphQL Version Conflicts**

   - ✅ **Fixed**: Server and client now use matching GraphQL v15.8.0
   - If you see conflicts, ensure you're using `npm ci` not `npm install`

3. **MongoDB Connection Issues**

   - Ensure Docker is running: `docker ps`
   - Check container status: `docker-compose logs mongo`
   - Restart if needed: `docker-compose restart mongo`

4. **Port Already in Use**

   - **Issue**: `Error: listen EADDRINUSE: address already in use :::4000`
   - **Solution**: The setup script now automatically cleans up ports 4000 and 5000
   - **Manual fix**: 
     - Server (4000): `lsof -ti:4000 | xargs kill -9`
     - Client (5000): `lsof -ti:5000 | xargs kill -9`

5. **Node Version Issues**

   - Use the version specified in `.nvmrc`: `nvm use`
   - Minimum required: Node.js 16+

6. **Security Vulnerabilities**

   - If you see npm audit warnings, you can fix them with:
   ```bash
   npm audit fix
   cd client && npm audit fix && cd ..
   ```

7. **Clean Installation**
   ```bash
   # Remove all dependencies and reinstall with exact versions
   rm -rf node_modules package-lock.json
   rm -rf client/node_modules client/package-lock.json
   npm install  # Use install instead of ci for fresh setup
   cd client && npm install && cd ..
   ```

### Quick Health Check

```bash
# Check if everything is running correctly
curl http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { __typename }"}'

# Should return: {"data":{"__typename":"RootQueryType"}}
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
