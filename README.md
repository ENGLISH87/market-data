# MarketData

Angular-based web app playground for interacting with market data and charting, using web sockets and REST api provided by Polygon.io

The app also includes the use of many new Angular experimental features still in developer preview such as Standalone Components and Built-in Control Flow

This is by no means a finished product and has plenty of room for improvement:

- Error handling required for all effects/api calls and displayed using some form of error snackbar
- HttpInterceptor for dealing with failed reqs / repeat attempts etc
- Overlay notification to inform user if websocket connection has disconnected or failed
- Polygon.io subscription only allows a single websocket connection at any given time, websocket will disconnect if app opened in another window
- Some areas contain empty components and or static placeholder data

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
