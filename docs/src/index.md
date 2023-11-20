# Introduction

`nestjs-eve-auth` is a Nest.js authentication library for EVE Online players. It exposes services, decorators and other tools necessary to easily implement OAuth2 authentication against the EVE SSO service.

## Scope

My aim is to keep this library quite minimal and include only the core functionality required for a client application to use EVE SSO. The idea behind is to avoid complexity and focus on security-critical parts.

To that end, I am also developing another Nest.js library (on top of `nestjs-eve-auth`) for tackling the larger problem of user management. That library is a logical place for stuff that is not that critical for security, and the architecture can be more opinionated to speed up development.

However, `nestjs-eve-auth` does come with a set of limitations:

- Only web app OAuth2 authentication flow is supported. Practically this means that this library is only useful for Nest.js web application backends.
- Backend must use `express` and `express-session`. This requirement could be abstracted away but it is unclear if it would be worth all the work. (If you need this, please open an issue.)

## Vulnerabilities

If you find a vulnerability in `nestjs-eve-auth`, please open an issue, or even better, make a pull request :)

## Documentation Version

This documentation is published from the latest stable version released to NPM. For other versions, please checkout the relevant tag or commit, and read the docs locally. (`npm run docs` in repo root launches the documentation dev server.)
