# ClientPanel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.
This is a web application in angular with angular material.It includes a login and dashboard component.The components  retrieve data from the JSON placeholder api in JSON format.It prevent unauthorised persons from accessing the dashboard component. The login details are: email:elvis@gmail.com aand Password: password. Data was passed around using the @ViewChild, event and property binding and the services component.The dashboard component contains a table that can be filtered and sorted by any of the table headers.Data in the table can also be exported to excel and PDF.
NB:If you dont logout, you will still get access to the dashboard, because you still have a token even if u get to the login page and the router guard is activated on logout.

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
