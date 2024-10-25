Blog Website

Overview
Blog Website is a full-stack application that allows users to create, manage, and interact with blog posts. Built using React for the frontend and Node.js with Express for the backend, this project showcases a robust implementation of modern web development practices, including RESTful APIs, user authentication, and responsive design.

Table of Contents
Features
Technologies Used
Installation
Environment Variables
Running the Application
API Endpoints
Contributing
License
Contact
Features
User authentication (registration and login)
Create, edit, delete, and view blog posts
Responsive UI built with Bootstrap
State management using Redux
Form handling with Formik and Yup for validation
Secure API with JWT authentication
CORS support for cross-origin requests
Technologies Used


Frontend:

React
Vite
Redux Toolkit
Axios
Bootstrap
Formik
Yup
React Router
Backend:

Node.js
Express
Mongoose (MongoDB)
JWT (JSON Web Tokens)
Bcrypt for password hashing
Multer for file uploads
Installation
To set up the project locally, follow these steps:

Prerequisites
Node.js (v14 or higher)
MongoDB account (Atlas or local installation)
Clone the Repository
 
 
git clone https://github.com/BapiMajumder1402/blog-website-assignment.git
cd blog-website-assignment
Install Backend Dependencies
Navigate to the server directory:

 
 
cd server
Install the required packages:

 
 
npm install
Install Frontend Dependencies
Navigate to the client directory:

 
 
cd ../client
Install the required packages:
npm install
Environment Variables
Create a .env file in both the client and server directories with the following configurations:

Server .env file
PORT=8000
MONGO_DB=Your Mongo db URI dont have to add /(databasename) 
CORS=*

Start the Backend
Ensure you're in the server directory.
Start the server using Nodemon for automatic restarts during development:
npm run dev


Start the Frontend
Navigate back to the client directory:
cd ../client
Client .env file

VITE_API_URL="http://localhost:8000/api/v1"
Running the Application
Start the development server:
npm run dev
The frontend will typically run on http://localhost:5173 by default.



Backend Routes Documentation
This documentation outlines the API routes for the Blog Website application, including endpoints for managing blogs, comments, and user authentication.

Blog Routes
Base URL
/api/v1/blogs


Create a Blog Post

Method: POST
Endpoint: /
Authorization: Requires JWT token (via verifyJWT middleware)
Request Body: JSON object containing blog post details (e.g., title, content, author, etc.)
Response: Returns the created blog post object.

Get All Blog Posts

Method: GET
Endpoint: /
Authorization: None
Response: Returns an array of all blog posts.

Get a Single Blog Post

Method: GET
Endpoint: /:id
Authorization: None
Parameters:
id - The unique identifier of the blog post.
Response: Returns the blog post object corresponding to the given ID.

Get Unique Authors


Method: GET
Endpoint: /user/blogs
Authorization: Requires JWT token (via verifyJWT middleware)
Response: Returns an array of blog posts authored by the current user.

Update a Blog Post

Method: PUT
Endpoint: /:id
Authorization: Requires JWT token (via verifyJWT middleware)
Parameters:
id - The unique identifier of the blog post.
Request Body: JSON object containing updated blog post details.
Response: Returns the updated blog post object.

Delete a Blog Post

Method: DELETE
Endpoint: /:id
Authorization: Requires JWT token (via verifyJWT middleware)
Parameters:
id - The unique identifier of the blog post.
Response: Returns a success message upon deletion.
Comment Routes
Base URL
/api/v1/comments

Create a Comment

Method: POST
Endpoint: /
Authorization: Requires JWT token (via verifyJWT middleware)
Request Body: JSON object containing comment details (e.g., blog ID, content, author, etc.)
Response: Returns the created comment object.

Delete a Comment

Method: DELETE
Endpoint: /:id
Authorization: Requires JWT token (via verifyJWT middleware)
Parameters:
id - The unique identifier of the comment.
Response: Returns a success message upon deletion.
Get Comments


Routes

Register a New User

Method: POST
Endpoint: /register
Authorization: None
Request Body: JSON object containing user details (e.g., username, email, password).
Response: Returns the registered user object.

Login User

Method: POST
Endpoint: /login
Authorization: None
Request Body: JSON object containing login credentials (e.g., email, password).
Response: Returns the logged-in user object along with a JWT token.
Middleware
JWT Verification Middleware
Functionality: The verifyJWT middleware checks the validity of the JWT token provided in the request headers. It ensures that the user is authenticated before accessing protected routes.



Frontend Functionalities
The frontend of the blog application is built using React, leveraging Redux for state management and Axios for API calls. Below are the key features and functionalities:

User Authentication
Sign Up: Users can create an account by providing necessary details.
Log In: Users can log in with their credentials.
Protected Routes: Certain routes are protected to ensure that only authenticated users can access them.
Blog Management
Create Blog Posts: Authenticated users can create new blog posts, including a title and content.
View Blog Posts:
Users can see a list of all blog posts with their titles and authors.
The homepage displays the latest 6 blog posts.
Edit and Delete Blog Posts: Users can update and remove their own blog posts.
Commenting System
Add Comments: Logged-in users can add comments to blog posts.
Delete Comments: Users can delete only their own comments.
Search Functionality
Debounced Search: Implemented for an optimized user experience, allowing users to search for blog posts with reduced input lag.
Pagination and Sorting
Pagination: Blog posts are paginated to enhance usability.
Sorting Options: Users can sort blog posts based on creation time and specify the page size.
Responsive Design
The application features a responsive layout, ensuring a seamless experience across different devices.

