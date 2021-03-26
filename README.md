# simple-typescript-tcp-jsonrpc

[![build status](https://github.com/Nauja/simple-typescript-tcp-jsonrpc/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Nauja/simple-typescript-tcp-jsonrpc/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/Nauja/simple-typescript-tcp-jsonrpc/branch/main/graph/badge.svg?token=6ZHBCWGR2L)](https://codecov.io/gh/Nauja/simple-typescript-tcp-jsonrpc)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is just an example of a simple TCP server using JSON-RPC as a protocol.

The goal is to demonstrate how to build a simple TCP server with NodeJS and make a good use of basic best practices such as TypeScript, unit testing or lint.

## Table of contents:

- [TypeScript for static type definitions](#typescript-for-static-type-definitions)
- [ESLint for code quality](#eslint-for-code-quality)
- [Prettier for code formatting](#prettier-for-code-formatting)
- [Jest for JavaScript testing](#jest-for-javascript-testing)
- [Publish coverage to codecov](#publish-coverage-to-codecov)
- [Testing](#testing)

## TypeScript for static type definitions

It is greatly recommended to use [TypeScript](https://www.typescriptlang.org/) on a big codebase as it make the code more readable, secure and reliable by adding static type definitions.

The first thing is to install [typescript](https://www.npmjs.com/package/typescript) and [@types/node](https://www.npmjs.com/package/@types/node) for NodeJS type definitions:

```bash
$ npm i --save-dev typescript @types/node
```

Now create a `tsconfig.json` configuration file containing:

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ]
}
```

This tells TypeScript to compile all `.ts` files from `"src/**/*"` to the `"outDir": "dist"` folder. Also note the `"module": "commonjs"` configuration that makes TypeScript compile your code to CommonJS modules.

For example, a `foo.ts` file with the following code:

```js
export function foo()
{
    // content
}
```

Would be compiled to `foo.js`:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function foo() {
    // content
}
exports.foo = foo;
```

The last step is to add the following script in `package.json`:

```json
"scripts": {
    "build": "tsc"
}
```

You can now build your code with:

```bash
$ npm run build
```

## ESLint for code quality

[ESLint](https://eslint.org/) is a tool for helping to find and fix problems in JavaScript code. It is easily usable from command line or with Visual Code.

Create an `.eslintrc` file:

```bash
{
    "parser": "@typescript-eslint/parser",
    "extends": ["plugin:@typescript-eslint/recommended"],
    "rules": {
        "sort-imports": [
            "error",
            {
                "ignoreCase": false,
                "ignoreDeclarationSort": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
                "allowSeparatedGroups": false
            }
        ],
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-unused-vars": "warn"
    }
}
```

This make eslint use the default rules existing in `@typescript-eslint/recommended` plus the ones you define under `"rules"`. Here we force to sort imports by names, to avoid using the explicit type `any` in our code, and we warn about unused variables.

Create an `.eslintignore` file:

```bash
node_modules
dist
```

This will make eslint ignore `node_modules` and `dist` folders.

Add the following script in `package.json`:

```json
"scripts": {
    "lint": "tsc --noEmit && eslint \"**/*.{js,ts}\" --quiet --fix"
}
```

Run eslint with:

```bash
$ npm run lint
```

There are many rules you can enforce with eslint to make your code more safe and readable. For example, you can forbidden the `require` statement as part of an assignment:

```js
const Server = require("jsonrpc-node").TCP.Server
// Should be:
// import * as jsonrpc from "jsonrpc-node"
// const Server = jsonrpc.TCP.Server
```

Running eslint would output:

```bash
simple-typescript-tcp-jsonrpc\src\app.ts
  3:16  error  Require statement not part of import statement  @typescript-eslint/no-var-requires

✖ 1 problem (1 error, 0 warnings)
```

Or in Visual Code (make sure to install the ESLint extension):

![](https://github.com/Nauja/simple-typescript-tcp-jsonrpc/blob/media/eslint-vscode-require.png?raw=true)

## Prettier for code formatting

[Prettier](https://prettier.io/) is an opinionated tool to format your code consistently so everyone working on the project follow the same coding style and the code is more readable. You can use it both from command line and from VSCode.

Just install it:

```bash
$ npm i --save-dev prettier
```

Create a `.prettierrc` configuration file:

```json
{
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false
}
```

While those settings may be subjective, make sure to commit `.prettierrc` in your project so everyone follow the same rules.

Add the following script in `package.json`:

```json
"scripts": {
    "format": "prettier --write \"src/**/*.ts\"  \"test/**/*.ts\""
}
```

And now you can format your codebase with:

```bash
$ npm run format
```

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
> simple-typescript-tcp-jsonrpc@1.0.0 test simple-typescript-tcp-jsonrpc
> jest --forceExit --coverage --verbose

 PASS  test/app.test.ts
  test server RPCs
    √ call ping should send pong (37 ms)

  console.log
    Server listening for connection requests on socket 0.0.0.0:65402

      at Server.<anonymous> (src/app.ts:23:17)

  console.log
    server port is 65402

      at test/app.test.ts:13:21

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |       50 |     100 |     100 |
 app.ts   |     100 |       50 |     100 |     100 | 28
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.808 s, estimated 4 s
Ran all test suites.
```

## Publish coverage to codecov

For continuous integration, it is best to automatically publish coverage results to a service like [codecov.io](https://codecov.io/).

It can be easily done with [codecov](https://www.npmjs.com/package/codecov):

```bash
$ npm install --save-dev codecov
$ npm run test
$ ./node_modules/.bin/codecov --token=CODECOV_TOKEN
```

## Testing

```bash
$ git clone https://github.com/Nauja/simple-typescript-tcp-jsonrpc.git
$ cd simple-typescript-tcp-jsonrpc
$ npm install
$ npm test
```
