# Command Reference

All commands are run in repository root unless otherwise noted.

:::tip
These commands are used to control the development environment, etc. They are not applicable to normal use of the library.
:::

## Development Environment

### Start Development Environment

Build the libarary and start the dev application with the locally built library as dependency. The application is accessible at [http://localhost:3000](http://localhost:3000).

```bash
npm start
```

:::tip
Changes to the _dev app_'s code are hot-reloaded but _library_ changes are not. To rebuild the library and run dev with the changes, simply `Ctrl+C` and run `npm start` again.
:::

### Stop Development Environment

Stop the development environment's background services.

```bash
npm stop
```

## Documentation

### Documentation Development Server

Start the documentation's development server with hot-reload at [http://localhost:8080](http://localhost:8080).

```bash
npm run docs
```

### Generate Docs

Run TypeDoc to generate markdown files from code into `api` folder.

```bash
npm run generate
```
