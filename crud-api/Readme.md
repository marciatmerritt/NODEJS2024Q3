# CRUD API Assignment

![Node.js](https://img.shields.io/badge/node.js-22.x.x-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-4.x.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [Project Context](#project-context)
- [Description](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
    - [Horizontal Scaling](#horizontal-scaling)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
  - [GET /api/users](#get-apiusers)
  - [GET /api/users/:userId](#get-apiusersuserid)
  - [POST /api/users](#post-apiusers)
  - [PUT /api/users/:userId](#put-apiusersuserid)
  - [DELETE /api/users/:userId](#delete-apiusersuserid)
- [License](#license)

## Project Context

This project is part of the RS School Node.js 2024Q3 course. It was assigned as part of the CRUD API module to demonstrate proficiency in building a simple, asynchronous, RESTful API with full CRUD functionality using in-memory storage. This project adheres to the course's technical requirements, such as using Node.js version 22.x.x and TypeScript.

## Description

This project implements a CRUD (Create, Read, Update, Delete) API for managing users. Users are stored in an in-memory database and contain the following fields:

- `id`: Unique identifier (UUID)
- `username`: User's name (string, required)
- `age`: User's age (number, required)
- `hobbies`: User's hobbies (array of strings, required)

The API supports the following operations:

- **GET**: Retrieve all users or a specific user by ID
- **POST**: Create a new user
- **PUT**: Update an existing user's details
- **DELETE**: Remove a user from the database

The project also includes error handling, server-side validation, and support for running in different modes (development and production). Additionally, horizontal scaling is implemented using Node.js clustering and a load balancer.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js version 22.x.x or higher
- npm (or yarn)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-repo/crud-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd crud-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

#### Development Mode

To run the application in development mode, use `nodemon` or `ts-node-dev`. This mode will watch for file changes and restart the server automatically.

```bash
npm run start:dev
```

#### Production Mode

To run the application in production mode, first, build the project and then start the bundled version:

```bash
npm run start:prod
```

#### Horizontal Scaling

To run the application in a multi-process mode with horizontal scaling, use the `start:multi` script. This will start a load balancer and multiple worker instances.

```bash
npm run start:multi
```

### Testing

Run tests to verify the API behavior. There are a minimum of three test scenarios, including CRUD operations and edge cases.

```bash
npm run test
```

## API Documentation

### GET /api/users

Retrieve all user records.

- **Response**: `200 OK` and an array of user records

### GET /api/users/:userId

Retrieve a specific user by ID.

- **Response (Success)**: `200 OK` and the user record
- **Response (Invalid UUID)**: `400 Bad Request`
- **Response (User Not Found)**: `404 Not Found`

### POST /api/users

Create a new user. The request body must include:

- `username` (string)
- `age` (number)
- `hobbies` (array of strings)

- **Response (Success)**: `201 Created` and the newly created user record
- **Response (Invalid Body)**: `400 Bad Request`

### PUT /api/users/:userId

Update an existing user by ID.

- **Response (Success)**: `200 OK` and the updated user record
- **Response (Invalid UUID)**: `400 Bad Request`
- **Response (User Not Found)**: `404 Not Found`

### DELETE /api/users/:userId

Delete an existing user by ID.

- **Response (Success)**: `204 No Content`
- **Response (Invalid UUID)**: `400 Bad Request`
- **Response (User Not Found)**: `404 Not Found`

## Acknowledgements
This project is part of the RS School NodeJS 2024 Q3 course, which focuses on building scalable NodeJS applications and implementing efficient testing techniques. Special thanks to the course mentors and contributors for their guidance.

## Authors

Marcia Merritt 

[![LinkedIn][Linkedin]][linkedin-url]


## Version History

* 0.1
    * Initial Release 18/10/2024

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


<!--Markdown Links and Images -->
[Node.js Badge]: https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat
[Node JS]:https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/download
[tested with jest]: https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest
[jest-url]:(https://github.com/jestjs/jest)
[jest tested]: https://img.shields.io/badge/Jest-tested-eee.svg?logo=jest&labelColor=99424f
[jest]:https://jestjs.io/img/jest-badge.svg
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[Linkedin]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/marcia-merritt-58662761/

![Node.js](https://img.shields.io/badge/node.js-22.x.x-brightgreen)\r ![TypeScript](https://img.shields.io/badge/typescript-4.x.x-blue)\r ![License](https://img.shields.io/badge/license-MIT-green)"