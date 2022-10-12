

# EventBooking

This project was generated using [Nx](https://nx.dev).

## Prerequisites
- Node installed (>= v16.13.0)
- Docker installed (docker compose v1)

## How to run
1. `npm install`
1. `npm run docker-start` to bring up the postgres instance
2. `npm run migrate` to apply all DB migrations
3. `npm run seed` to seed the initial event data
4. `npm run start-apps` to start both the api and the React app

...then browse to http://localhost:4200/

### Testing
5. `npm run test-api`

## Assumptions
- Was not clear if this was to be used by the public or as an internal tool used by a business managing events. For the prototype, I chose to go with the latter. Implications of this is that the API has no context of the user accessing it, and as a result shows all bookings for an event, rather than a list of booking specific to the user who made them. 
- No details were specified on what represented a 'booking'. For the prototype, I chose to capture first name and last name as a reference for whom the booking belonged to.
- The scope mentioned that 'users are able to book a seat' (singular), the prototype works on the basis that a booking is limited to a single person/seat.
- The scope mentioned displaying a message in the case that the user goes to book but the booking fails to pass event capacity business rules. However, I chose to hide the booking form once the max capacity was reached in an attempt to reduce user frustration.

## Key design considerations
- Nx was chosen to help reduce time spent in setting up the scaffold for the prototype. It should also assist with maintainability as the application grows through the likes of libraries and associated tooling + caching abilities.
- Repository pattern was chosen to separate the data access layer. This will assist in testing as those repositories can be mocked.
- Business logic was split into its own service. This allows the logic to be tested once and shared amongst code.
- Typescript was used on both front end and backend to provide type security as the application grows
- Express was used as it will allow us to support any other APIs that may not be suitable for graphql
- Graphql queries/mutations separated by entity in the aim to assist with maintainability of solution
- Before proceeding beyond the prototype phase, the following questions should be considered:
  - Is there any appetite to support multiple seats per booking? This would require a change to the database
  - Is there any other information that needs to be associated with a booking? Contact number, email etc
  - Do cancelled bookings need to be retained at all?

## Compromises/Tech-Debts
- Add repository mocks to better support testing of the EventService.createBooking function. Currently, the business logic is tested separately and is open to breaking changes in the createBooking function.
- Graphql caching was disabled on the front end to aid in the speed of the prototype development. A caching strategy can be decided upon and implemented as the app scales.
- Add appropriate database indexes. As we commonly look up bookings based on eventId, adding an index will help with performance as the application scales.
- The bookings listed under the event detail page only refresh based on the actions of the user. If deployed and used by multiple people concurrently, there is the potential for them to become out of sync with the latest bookings. Currently, the business logic checks on the server are used as a safe guard and will prevent invalid scenarios. In the future, this could be improved through graphql subscriptions or polling if it is deemed important enough.
- When adding or removing bookings, the event and bookings are re-fetched. This could be slightly improved by only re-fetching the booking for the event however as it currently stands, it is not an expensive request.
- Use of any with GraphQLFieldConfig type. Unsure about what types it is expecting and left it as due to time constraints. Research required to resolve.
- Use of styles.scss for global styling. Could be broken down to component level styles where suitable.

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@event-booking/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
