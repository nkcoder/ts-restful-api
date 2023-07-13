## Dependencies

- express: a fast and minimalist web framework for Node.js
- body-parser: middleware for parsing request bodies
- cors: middleware for enabling cross-origin resource sharing
- typescript: tye TypeScript compiler
- ts-node: TypeScript execution and REPL for Node.js
- nodemon: utility that automatically restarts the server on code changes during development
- @types/express and @types/node: TypeScript type definitions for Express and Node.js

## How to run

The following command will compile the TypeScript code and run the server using `ts-node`:
```bash
npm start
```

This command will start the server using `nodemon`, which automatically restarts the server when changes are detected:
```bash
npm run dev
```