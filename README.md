# TesterSearchApp

## Backend

The REST API server code resides in the server folder which consists of the following components:
  - create_db.py -> An auxiliary script that was used to populate an sqlite database with the data stored in the csv files in the data folder. The database is persised in the testers.db file.
  - server.py -> Run `python server.py` to start a server at http://localhost:5000. Three REST endpoints are exposed:
    - /testers?search=query to search for testers based on provided criteria, e.g. /testers?search={"countries": ["US"], devices: ["iPhone 4"]}
    - /countries to retrieve the list of all available countries
    - /devices to retrieve the list of all available devices

## Frontend

The frontend project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
