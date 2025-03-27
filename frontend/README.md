# To-Do List App (Frontend)

## Getting Started

### 1. Setting Up the Frontend

First, create a folder named **`frontend`**, then inside it, I initialized a Vue.js project with Vite by running the following command:

```sh
npm create vite@latest my-vue-app -- --template vue
```

After the project was successfully set up, I installed the necessary dependencies using:

```sh
npm install
```

### 2. Create the `Form` Component

- Inside the **components** folder, create a file named `Form.jsx`.

### 3. Add the Form in `App.jsx`

- Import `Form.jsx` into `App.jsx`.
- Use `<Form />` inside `App.jsx` to display it.

### 4. Create Input & Button

- Add an **input field** for users to enter a to-do.
- Add a **button** to submit the to-do.

### 5. Manage State with `useState`

- Use `useState` to track input value (`todoName`).

### 6. Handle Form Submission

- Create `submitHandler` to prevent default form submission.
- Log the entered to-do and reset the input field.

### 7. Managing Todos in `App.jsx`

- A **state** (`todos`) is created using `useState` to store all to-dos.
- The `addTodo` function updates `todos` by adding new tasks from the **Form component**.
- The `deleteTodo` function removes a to-do by its **ID**.
- The `toggleCheckBox` function updates the **completed** status when the checkbox is clicked.

### 8. Adding a New Todo (`Form.jsx`)

- The **Form component** collects user input and sends it to `addTodo`.

### 9. Displaying Todos (`TodoList.jsx`)

- The **TodoList component** receives `todos` from `App.jsx` and displays them.
- Each to-do includes:
  - A **checkbox** to mark it as completed.
  - A **delete button** to remove it from the list.

### 10. Manage and Filter Your Tasks (`TodoFilter.jsx`)

We created the **TodoFilter** component with filtering options for **All, Pending, and Completed** tasks.

- Clicking **All** shows all todos.
- Clicking **Completed** shows only completed ones.
- Clicking **Pending** shows only pending tasks.
