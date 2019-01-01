# 01 &mdash; Hello, TypeScript
> Simplest TypeScript program illustrating the project structure and basic config for TypeScript development

# Description
This example illustrates how to configure a TypeScript project with the basic configuration:
+ TypeScript compiler
+ `package.json` Configuration
+ TypeScript linter (`tslint`): CLI configuration
+ Project tasks configuration
+ VSCode linter configuration
+ VSCode TypeScript debugger configuration


## TypeScript Compiler
As described in the VSCode documentation and in the book, the TypeScript compiler has to be installed either globally or in the workspace.

```bash
npm install -g typescript
```


## `package.json` configuration
No surprises related to the project configuration: a `package.json` was created with the following `devDependencies`:

```json
...
  "devDependencies": {
    "tslint": "5.12.0",
    "typescript": "3.2.2",
    "typescript-tslint-plugin": "0.2.1"
  },
...
```

In order to configure the TypeScript compiler, a `tsconfig.json` is created with the following info:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": "app/src",
    "sourceMap": true,
    "noEmitOnError": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "target": "es6",
    "watch": false,
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2016", "dom"],
    "plugins": [{"name": "typescript-tslint-plugin"}]
  },
  "exclude": ["node_modules"],
}
```

## TypeScript linter (`tslint`): CLI configuration
The TypeScript linter does not need to be globally installed. Thus, it is enough to include it as a `devDependency` and create a `tslint.json` with the configuration:

```json
{
  "extends": "tslint:recommended",
  "defaultSeverity": "error",
  "rules": {
    "no-console": {
      "severity": "none"
    },
    "quotemark": [true, "single", "backtick"]
  }
}
```

## Project Tasks Configuration
Once the `package.json`, the TypeScript compiler and the `tslint` has been configured, we have everything we need to properly configure the tasks in the `package.json`:

```json
...
  "main": "index.ts",
  "scripts": {
    "setup": "rm -rf node_modules && npm install",
    "tsc-watch": "node_module/.bin/tsc -version && tsc -w",
    "pretsc": "npm run tslint",
    "tsc": "node_modules/.bin/tsc",
    "start": "node dist/$( echo ${npm_package_main} | cut -f1 -d. ).js",
    "tslint": "node_modules/.bin/tslint app/src/*",
    "debug": "node --inspect-brk dist/$( echo ${npm_package_main} | cut -f1 -d. ).js"
  }
...
```

Note that it's pretty similar to what you'd expect for a JavaScript Node.js project, except that for executing or debugging you'd need to first transpile and then execute the corresponding `.js` file.

## VSCode Linter Configuration
Initially, the Visual Studio Code Linter for TypeScript was reporting different errors from the one reported by the task `npm run tslint`. In order to fix it, the extension *TypeScript TSLint Plugin* by *Microsoft* was installed. 

Note that the plugin had been already included in the `tslint.json`:

```json
...
  "plugins": [{"name": "typescript-tslint-plugin"}]
...
```

Additional information from https://github.com/Microsoft/typescript-tslint-plugin was not performed.

The next step consisted in configuring the user setting to make VSCode report Style Checks as errors, as the default was true.

```json
`"typescript.reportsStyleChecksAsWarnings": false,`
```

## VSCode TypeScript debugger configuration
VSCode can debug *TypeScript* right away, you only need to configure the `.vscode/launch.json`:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run-script",
        "debug"
      ],
      "stopOnEntry": true,
      "port": 9229,
      "useWSL": true
    }
  ]
}
```

Then you can just click on the *Debug* icon and the VSCode debugger will be able to debug directly the `*.ts` files.