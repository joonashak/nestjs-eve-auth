# Command Reference

All commands are run in repository root unless otherwise noted.

_These commands are used to control the development environment, etc. They are not applicable to normal use of the library._

### Start Development Environment

Build the libarary and start the dev application with the locally built library as dependency. The application is accessible at [http://localhost:3000](http://localhost:3000).

Changes to the dev app's code are hot-reloaded but library changes are not. To rebuild the library and run dev with the changes, simply `Ctrl+C` and run `npm start` again.

```bash
npm start
```

### Stop Development Environment

Stop the development environment's background services.

```bash
npm stop
```

### Documentation Development Server

Start the documentation's development server with hot-reload at [http://localhost:8080](http://localhost:8080).

```bash
npm run docs
```
