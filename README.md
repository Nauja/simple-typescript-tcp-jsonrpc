# simple-typescript-tcp-jsonrpc

[![build status](https://github.com/Nauja/simple-typescript-tcp-jsonrpc/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Nauja/simple-typescript-tcp-jsonrpc/actions/workflows/nodejs.yml)

This is just an example of a simple TCP server using JSON-RPC as a protocol.

The goal is to demonstrate how to build a simple TCP server with NodeJS and make a good use of basic best practices such as TypeScript, unit testing or lint.

## Jest for JavaScript testing

This sample use [Jest](https://jestjs.io/) for unit testing as explained here [github.com/microsoft/TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter).

The first thing is to install [jest](https://www.npmjs.com/package/jest) and [@types/jest](https://www.npmjs.com/package/@types/jest) for type definitions:

```bash
$ npm i --save-dev jest @types/jest
```

You also need to install [ts-jest](https://www.npmjs.com/package/ts-jest) for testing a project written in TypeScript:

```bash
$ npm i --save-dev ts-jest
```

Jest configuration is done in `jest.config.js`:

```bash
module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node"
};
```

This configures Jest to run all tests from the `test` directory matching the `**/test/**/*.test.(ts|js)` pattern. It also enable `ts-jest` to allow testing code written in TypeScript.

The last step is to add the following script in `package.json`:

```json
"scripts": {
    "test": "jest --forceExit --coverage --verbose"
}
```

You can now run tests with:

```bash
$ npm run test
> simple-typescript-tcp-jsonrpc@1.0.0 test F:\simple-typescript-tcp-jsonrpc
> jest --forceExit --coverage --verbose

 PASS  test/app.test.ts (7.33 s)
  GET /random-url
    √ should return 404 (2 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        8.952 s
Ran all test suites.
```

## Testing

```bash
$ git clone https://github.com/Nauja/simple-typescript-tcp-jsonrpc.git
$ cd simple-typescript-tcp-jsonrpc
$ npm install
$ npm test
```
