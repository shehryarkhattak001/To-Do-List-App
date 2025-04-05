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
🔷 Squelize cli &rarr; It is a command-line tool that simplifies working with squelize, such as migration an model generation.

Making .gitignore for node modules, when we commit on github so node modules should stay here

### 3. Setup basic Express Server

- Create an `index.js` file. and write a todo code

### 4. Configure PostgreSQL Database

- Install database from windows
- Start PostgreSQl Service - Open pgAdmin and create a new database

### 4.1. Setup Sequelize

- Initialize Sequelize

```sh
npx sequelize-cli init
```

- The folder structure will appear in front of you

### 4.2. Now setup the database connection

- Open `config/config.json` and update the development:

### Backend to Frontend Scenario

- Receiving data from Form
- getting data from app.jsx

### 5: Create the .env File for Database Credentials

We need to store sensitive information like database credentials in a safe place. The `.env` file will contain environment variables like the database URL, username, and password.

```bash
touch .env
```

You can add your PostgreSQL credentials in the `.env` file, like so:

```
DB_USER=yourUsername
DB_PASSWORD=yourPassword
DB_NAME=yourDatabase
DB_HOST=localhost
```

---

### 6: Generate Models with Sequelize CLI

Now, let’s use **Sequelize CLI** to set up the project structure, including models, migrations, and config files. Run this command:

```bash
npx sequelize-cli init
```

This will generate the necessary folders like `models`, `migrations`, and `config` inside your project.

---

### 7: Create the User Model

We’ll create a `User` model to store user data, like email and password. You can use the following command to generate the model:

```bash
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

This command will generate a `User` model in the `models` folder and a corresponding migration file for creating the `User` table in the database.

---

### 8: Create Authentication Routes and Controller

Let’s create a folder for **routes** and another for **controllers**. This way, our code will be organized.

- Create routes for authentication:

  ```bash
  mkdir routes
  touch router.js
  ```

- Create a controller to handle the authentication logic:
  ```bash
  mkdir controllers
  touch authController.js
  ```

These files will later contain the functions to handle user registration, login, and JWT authentication.

---

### 9: Run Migrations to Create Tables

Sequelize migrations help us create database tables. Let’s apply the migration to create the `User` table.

```bash
npx sequelize-cli db:migrate
```

---

### 10: Create the Todo Model

Let’s create a `Todo` model, where each user will be able to create multiple todos.

Generate the `Todo` model with the following command:

```bash
npx sequelize-cli model:generate --name Todo --attributes name:string,completed:boolean
```

Just like with the `User` model, this will create a `Todo` model and a migration file.

---

### 11: Create the Todos Routes and Controller

We need a new set of routes and controllers to handle todo-specific actions, like creating, updating, and deleting todos.

- Create routes for todos:

  ```bash
  touch todorouter.js
  ```

- Create a controller to handle the todo logic:
  ```bash
  touch todoController.js
  ```

---

### 12: Run Migration for the Todo Table

Just like we did for the `User` model, we now run the migration to create the `Todo` table.

```bash
npx sequelize-cli db:migrate
```

---

### 13: Establish Relationships Between User and Todo

We want to establish a one-to-many relationship between **Users** and **Todos**. A user can have many todos, but each todo belongs to one user.

To do this, we need to:

1. Add a `userId` column to the `Todo` table.
2. Create a new migration to add this column:

```bash
npx sequelize-cli migration:generate --name add-userId-to-todo
```

---

### 14: Authentication for Creating Todos

After setting up the relationship between `User` and `Todo`, we need to protect the **create-todo** endpoint with authentication.

In this endpoint, authentication is performed using the JWT token from the `Authorization` header.

---

### 15: Create and Manage Todos (CRUD)

Now, we will implement the following routes for handling todos:

1. **Create a Todo**: `/todos/create-todo`
2. **Get All Todos**: `/todos`
3. **Update a Todo**: `/todos/update/:id`
4. **Delete a Todo**: `/todos/delete/:id`

Each of these endpoints will include JWT authentication to ensure only authenticated users can access and modify their todos.

---
