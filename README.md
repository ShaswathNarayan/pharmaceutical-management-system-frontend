# Pharmaceutical Management System Frontend

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Pharmaceutical Management System is a web application designed to streamline the management of pharmaceutical sales and inventory. This repository contains the front-end code, which includes user interfaces for login, registration, medicine management, and order processing.

## Features
- User registration and login with validation.
- Dashboard displaying available medicines.
- Search functionality to find specific medicines.
- Add medicines to the cart and manage orders.
- User-friendly messages for various actions and errors.
- Integration with backend services for data retrieval and processing.

## Technologies Used
- HTML
- CSS
- JavaScript
- Fetch API for HTTP requests

## Getting Started
Follow these steps to get the project up and running on your local machine.

### Prerequisites
- A web browser (Chrome, Firefox, etc.)
- A text editor (VS Code, Sublime Text, etc.)
- Backend service running on `http://localhost:9000`

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/pharmaceutical-management-frontend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd pharmaceutical-management-frontend
    ```
3. Open `index.html` in your browser to start the application.

## File Structure
The project is structured as follows:
```
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
```

## Usage

### Login
1. Open `login/login.html` in your browser.
2. Enter your username and password.
3. Click "Login" to authenticate.

### Registration
1. Open `signup/signup.html` in your browser.
2. Fill out the registration form with a username, password, and email.
3. Click "Register" to create a new account.

### Dashboard
1. After successful login, you will be redirected to the dashboard (`pharmacydashboard/dashboard.html`).
2. View available medicines, search for specific medicines, and add them to your cart.

## API Endpoints
The front-end interacts with the following backend API endpoints:

- `GET /pharmaceutical/medicines/getAll` - Retrieve all medicines.
- `GET /pharmaceutical/medicines/search?searchTerm={term}` - Search for medicines by term.
- `GET /users/getByUsername/{username}` - Retrieve user details by username.
- `POST /users/add` - Add a new user.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes.
4. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
6. Open a pull request.
