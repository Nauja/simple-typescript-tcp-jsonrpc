# simple-typescript-tcp-jsonrpc

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
        'ts-jest': {
            tsconfigFile: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node'
};
```

## Testing

```bash
$ git clone https://github.com/Nauja/simple-typescript-tcp-jsonrpc.git
$ cd simple-typescript-tcp-jsonrpc
$ npm install
$ npm test
```
