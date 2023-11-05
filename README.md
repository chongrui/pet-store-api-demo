# Swagger Pet Store API Demo

This project is a React-based app that serves as an implementation example for a subset of the [Swagger Pet Store v3 API](https://github.com/swagger-api/swagger-petstore).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: The app requires Node.js version 16 or later. You can download it from the [official Node.js website](https://nodejs.org/en/download).

## Installation

To install the React app, follow these steps:

1. Clone the repository to your local machine or download the source code.

2. Open your terminal and navigate to the project's root directory.

3. Run the following command to install all necessary dependencies:
   ```
   npm install
   ```

After successfully installing the dependencies, you should be able to run and test the app.

## Local Development

There are two primary methods to run this app locally for development purposes:


### Run With Built-in Mock Data Locally

This project utilizes [Mirage.js](https://miragejs.com/) to seed mock data, which is derived from the sample data provided by the [Swagger Pet Store API's Docker image](https://github.com/swagger-api/swagger-petstore#to-run-via-docker). When the app is executed in development mode, this mock data is automatically seeded using the Webpack development server.

To run the app with built-in mock data, execute the following command (runs at http://127.0.0.1:3000 by default):
```
npm run start
```

### Run With a Real Backend Server Locally

This project also supports integration with a real backend server locally. It includes an [Express](https://expressjs.com/) server setup, which is configured to forward all network requests starting with **/api/v3/** to http://127.0.0.1:8080 (this default address can be modified through the environment variable **SWAGGER_PET_STORE_API_SERVER_ADDRESS**).

Furthermore, a **proxy** field has been added to the **package.json** file. This instructs the Webpack development server to proxy any non-text/html requests to the aforementioned Express server when in development mode. For additional information on this configuration, refer to the [official documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

Combining these two features enables you to take advantage of the Webpack development server's hot reload capability while directing the app to a live backend server, instead of relying on mock data.

To run the app with a real backend server locally, follow these steps:

1. Start the Swagger Pet Store API server locally via Docker or Maven at http://127.0.0.1:8080. For detailed instructions, visit the [Swagger Pet Store GitHub repository](https://github.com/swagger-api/swagger-petstore/tree/master#to-run-with-maven).

   - Note: by default, the Swagger Pet Store API server runs at http://127.0.0.1:8080.

2. Launch the development environment by executing `npm run dev`. This command sets everything else up automatically and runs at http://127.0.0.1:4000.

   - Note: In case you run the Swagger Pet Store API server on a different address or port rather than http://127.0.0.1:8080, provide the correct server address by setting the **SWAGGER_PET_STORE_API_SERVER_ADDRESS** environment variable prior to running the command.

## Production Deployment

When you're ready to deploy the app in a production environment, follow these steps:

### Building the App

First, you'll need to compile and optimize the React app for production. This can be accomplished by running:
```
npm run build
```

This command builds the app for production and outputs it to the build folder.

### Serving the App

For serving the built app, you have multiple options:

#### Using Your Preferred HTTP Server

You can serve the production build using any HTTP server of your choice.

#### Using the Included Express Server

Alternatively, the project includes a production-grade Express server which you can use to serve the app.

To test this locally, perform the following steps:

1. Ensure that the app is built using `npm run build` as described above.

2. Start the Swagger Pet Store API server locally via Docker or Maven at http://127.0.0.1:8080. For detailed instructions, visit the [Swagger Pet Store GitHub repository](https://github.com/swagger-api/swagger-petstore/tree/master#to-run-with-maven).

   - Note: by default, the Swagger Pet Store API server runs at http://127.0.0.1:8080.

2. Start the included Express server (runs at http://127.0.0.1:4000 by default) by running:
   ```
   npm run server
   ```
   - Note: In case you run the Swagger Pet Store API server on a different address or port rather than http://127.0.0.1:8080, provide the correct server address by setting the **SWAGGER_PET_STORE_API_SERVER_ADDRESS** environment variable prior to running the command.

By following these steps, your React app should be up and running in a production environment.

## Testing

### Unit Test

This project leverages [Jest](https://jestjs.io/) as the test runner and [Testing Library](https://testing-library.com/) for testing utilities in unit tests.

#### Interactive Mode

You can launch the unit test runner in interactive watch mode. This mode allows you to see test results in real-time as you make changes to the code. To enter interactive mode, run:
```
npm run test
```

#### Continuous Integration Mode

This mode runs the tests a single time and is optimized for CI environments. To run tests in CI mode, execute:
```
npm run test:ci
```

### End-to-end test

This project uses [Cypress](https://docs.cypress.io/guides/overview/why-cypress#Who-uses-Cypress) for end-to-end testing.

#### Interactive Mode

Execute `npm run e2e:open` to open Cypress in interactive mode. Choose "E2E Testing", select your browser, and run your tests from the "Specs" tab.

Remember to terminate the process in the terminal with "Ctrl+C" after completion to avoid background processes.

#### Continuous Integration Mode

Use `npm run e2e:ci` to run tests headlessly, suitable for continuous integration environments.