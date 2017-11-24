# TestGen (frontend)
An AngularJS + RequireJS frontend of an application used to generate quizzes.

## Important note

This is only the frontend of the application. You'll need the backend up and running in order to do anything with it:
https://github.com/bencun/testgen-api

## Getting Started

First of all clone the repository to your local dev machine.

### Prerequisites

You will need `Node.js` v8.8.1 or newer and `npm` v5.4.2 or newer installed on your machine. You will also need `bower` installed globally.

### Installing the dependencies

After cloning the repository you'll need to install all of the project dependencies. Run the following commands:

```
npm install
```
```
bower install
```

In order to be able to run the karma tests you'll need both `karma` and `karma-cli` installed globally.

```
npm install karma -g
npm install karma-cli -g
```

### Building

Simply run:
```
gulp build
```

The build will be located in the `/tmp` directory.

To build without minifying the files and running the tests (much faster build process) run:

```
gulp buildnominify
```

To invoke the file watcher that runs tests and builds when any of the files are modified run:
```
gulp watcher
```

### Running the app
Included server is set up to run on the `localhost:3000`, more vhosts can be added easily.
All the requests directed to the API are proxied to the server running on `localhost:8000` by default.

To start the server run:

```
node proxyserver.js
```

### Running the unit tests

The unit tests can be found in the `tests` directory. If you want to run them manually just run `karma`:

```
karma start
```