# Typescript, Mongooose and Express - CRUD OPERATION

## Table of Contents

- [Setup](#setup)
- [Running the Application](#running-the-application)

## Setup

1.  Clone the repository:

    `git clone https://github.com/abujakariacse/node_typescript_mongoose`

2.  Navigate to the project directory:
    `cd your-repository`

3.Install dependencies:
`npm install`

4. Create a .env file in the root of the project and add your MongoDB connection string:

```
NODE_VERSION=20.10.0
NODE_ENV= production
PORT = 5000
DB_URL = mongodb+srv://user:password@cluster0.iyijdxk.mongodb.net/ecommerce?retryWrites=true&w=majority

SALT_ROUND = 4343
```

#Running the Application

1. Build the TypeScript files:
   `npm run build`

2. Start the application:
   `npm start`

3. The server will be running at:
   `http://localhost:3000.`
