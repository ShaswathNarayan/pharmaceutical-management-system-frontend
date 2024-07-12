# pharmaceutical-management-system-frontend
Pharmaceutical Management System Frontend
Table of Contents
Overview
Features
Technologies Used
Getting Started
File Structure
Usage
API Endpoints
Contributing
License
Overview
The Pharmaceutical Management System is a web application designed to streamline the management of pharmaceutical sales and inventory. This repository contains the front-end code, which includes user interfaces for login, registration, medicine management, and order processing.

Features
User registration and login with validation.
Dashboard displaying available medicines.
Search functionality to find specific medicines.
Add medicines to the cart and manage orders.
User-friendly messages for various actions and errors.
Integration with backend services for data retrieval and processing.
Technologies Used
HTML
CSS
JavaScript
Fetch API for HTTP requests
Getting Started
Follow these steps to get the project up and running on your local machine.

Prerequisites
A web browser (Chrome, Firefox, etc.)
A text editor (VS Code, Sublime Text, etc.)
Backend service running on http://localhost:9000
Installation
Clone the repository:
sh
Copy code
git clone https://github.com/your-username/pharmaceutical-management-frontend.git
Navigate to the project directory:
sh
Copy code
cd pharmaceutical-management-frontend
Open index.html in your browser to start the application.
File Structure
The project is structured as follows:

Copy code
pharmaceutical-management-frontend/
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── signup/
│   ├── signup.html
│   ├── signup.css
│   └── signup.js
├── pharmacydashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
└── README.md
Usage
Login
Open login/login.html in your browser.
Enter your username and password.
Click "Login" to authenticate.
Registration
Open signup/signup.html in your browser.
Fill out the registration form with a username, password, and email.
Click "Register" to create a new account.
Dashboard
After successful login, you will be redirected to the dashboard (pharmacydashboard/dashboard.html).
View available medicines, search for specific medicines, and add them to your cart.
API Endpoints
The front-end interacts with the following backend API endpoints:

GET /pharmaceutical/medicines/getAll - Retrieve all medicines.
GET /pharmaceutical/medicines/search?searchTerm={term} - Search for medicines by term.
GET /users/getByUsername/{username} - Retrieve user details by username.
POST /users/add - Add a new user.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch:
sh
Copy code
git checkout -b feature/your-feature-name
Make your changes.
Commit your changes:
sh
Copy code
git commit -m 'Add some feature'
Push to the branch:
sh
Copy code
git push origin feature/your-feature-name
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
