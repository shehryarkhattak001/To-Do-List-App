# To-Do List App (Backend)

## Getting Started

### 1. Initialize Backend Project

- Create a new folder for the backend (e.g., `todo-backend`).
- Open the terminal and navigate to the backend folder.
- Run the following command to installed the Node.js project:

```sh
npm init -y
```

This will create a `package.json` file.

### 2. Installed Required Packages

- Now install the necessary dependencies

```sh
npm install express cors dotenv pg pg-hstore sequelize jsonwebtoken bcryptjs passport passport-google-oauth20
```

- Development packages

```sh
npm install --save-dev nodemon
```

#### Short explanation about Packages

🔷 express &rarr; To create nad manage the backend server
🔷 cors &rarr; Allows the frontend (React) to communicate with the backend (Express)
🔷 dotenv &rarr; Manages environment variables like database credentials securely
🔷 pg & pg-hstore &rarr; PostgreSQL client for connecting and interacting with the database
🔷 sequelize &rarr; An ORM to simplify database queries and management
🔷 jsonwebtoken &rarr; Used to generate and verify JWT Tokens for secure API authentication.
🔷 bcryptjs &rarr; Hashes password to enhance security before storing them in the database.
🔷 passport & passport-google-oauth20 &rarr; Enables Google OAuth login/signup.
🔷 nodemon &rarr; Automatically restarts the server when code changes in the runtime for development.

Making .gitignore for node modules, when we commit on github so node modules should stay here
