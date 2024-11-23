                                                         Project Overview

This is a Role Management System built with React, Express, and MongoDB, designed to manage user roles and permissions. The application allows administrators to create, update, and assign roles with associated permissions. The permissions are handled using a multi-select dropdown where users can select existing permissions or add custom ones. The roles are stored and updated in the backend, and users are notified of the changes through a dynamic interface.

                                                           Features
 
Role Creation: Users can create roles with a specific name and description.
Permission Management: Users can assign predefined permissions from a dropdown list or add custom permissions manually.
Dynamic Form Updates: The form dynamically updates to reflect changes, such as adding or removing permissions.
Editable Roles: Existing roles can be edited, with changes reflected immediately in the database.
Responsive UI: The interface is responsive, ensuring that the application works across different devices.

                                                        Technologies Used

Frontend: React.js, React-Select (for multi-select dropdown)
Backend: Express.js, Node.js
Database: MongoDB (for storing roles and permissions)
Styling: CSS for styling the components

                                                        Setup Instructions

Prerequisites, Before running the application, ensure you have the following installed:

Node.js: Version 14 or higher
MongoDB: Ensure your MongoDB server is running locally or use a cloud database like MongoDB Atlas.

1. Clone the repository https://github.com/Shagun-katariya/vrvsecurity_shagun_task.git
2. Install Backend Dependencies
Navigate to the backend directory and install the required dependencies.
npm install
3. Set Up Environment Variables
Create a .env file in the backend directory and add your MongoDB connection string:
MONGODB_URI=mongodb://localhost:27017/role_management
PORT=5000
4. Start the Backend Server
Run the server in development mode:
npm start
The backend will now be running on http://localhost:5000.

5. Install Frontend Dependencies
Navigate to the frontend directory and install the required dependencies:
cd ../frontend
npm install
6. Start the Frontend Server
Run the React development server:
npm start
The frontend will be running on http://localhost:3000.

7. Access the Application
You can now access the application by opening your browser and navigating to http://localhost:3000.

                                             Usage Instructions

Create a Role:
Go to the Create Role page.
Fill out the role name, description, and permissions.
Click on Create Role to save the new role.

Add Permissions:
Use the multi-select dropdown to choose permissions.
You can also add custom permissions by typing in the input field and pressing Enter.

Edit an Existing Role:
Navigate to the role list.
Click on an existing role to edit it.
Update the role's name, description, or permissions as needed.

View Role Details:
You can view the details of any role, including the permissions associated with it.

Code Structure
The project is structured as follows:

Backend
models/role.js: Defines the Role schema and database structure.
models/user.js: Defines the Role schema and database structure.
routes/roleRoutes.js: Contains the routes to handle role creation, updates, and fetch operations.
routes/userRoutes.js: Contains the routes to handle role creation, updates, and fetch operations.
controllers/roleController.js: CRUD Implementation on roles
controllers/userController.js: CRUD Implementation on users
app.js: Sets up the Express server and connects to MongoDB.

Frontend
components/navbar/Navbar.js: container navbar
components/loader/Loader.js: container loader for the application
components/role/roleForm.js: Contains the form used to create and edit roles.
components/role/roleList.js: Displays the list of created roles with options to edit or delete them.
components/user/userForm.js: Contains the form used to create and edit users.
components/user/userList.js: Displays the list of created users with options to edit or delete them.
App.js: The main component that holds the routing and the structure of the app.
services/api: role and user methodes for frontend

                                            Explanation of Features
Role Creation and Editing:
The user can create roles with a name, description, and a list of permissions. The name and description are stored in the database, and the permissions are either selected from a predefined list or entered manually as custom permissions.

Multi-Select Dropdown for Permissions:
The react-select component is used to display a multi-select dropdown. The options are dynamically loaded, and custom permissions can be added by typing into an input field and pressing Enter.
Custom Permission Input:

Users can add custom permissions not listed in the dropdown by typing into an input field. When the user presses Enter, the permission is added to the list.

                                              Responsive UI:

The layout adjusts based on the screen size, ensuring the application is usable on both desktop and mobile devices.

                                             Backend Integration:

The backend handles requests to create, update, and fetch roles and permissions from the MongoDB database. It exposes endpoints like POST /roles, GET /roles, and PUT /roles/:id.
