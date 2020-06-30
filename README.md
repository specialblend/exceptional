# Exceptional

user and machine friendly errors and exceptions

### Philosophy

**Exception: a throwable from which the program should reasonably recover.**

Examples: 
- bad user input => `InvalidParametersException`
- connection error => `MongoConnectionException`
- login failure => `InvalidLoginException`

**Error: a throwable from which the program would not reasonably recover.**

Examples: 
- Uncaught SyntaxError: Unexpected token else
- Uncaught TypeError: Cannot read property foo of undefined

**Exceptions** should be written for machines. **Errors** should be written for humans.

### Installation

`npm install @specialblend/exceptional`

### Usage

```typescript

import { Exception, tryCatchWrap } from './src/Exception';

interface FancyExceptionData {
    foo: string,
    bar: number,
}

(function myFancyExceptionExample() {
    class MyFancyException extends Exception<FancyExceptionData, Error> {}
    try {
        try {
            throw new Error('I am an ugly error message');
        } catch (err) {
            const data = {
                foo: 'I am fancy exception string data',
                bar: 13,
            };
            throw new MyFancyException('I am a user friendly error message', data, err);
        }
    } catch (ex) {
        console.error(ex.message, ex.code, ex.data, ex.err);
    }
}());

(async function mySuperFancyExceptionExample() {
    class MySuperFancyException extends Exception<FancyExceptionData, Error> {}
    function throwExampleErr() {
        throw new Error('I am a super ugly error message');
    }
    const data = {
        foo: 'I am fancy exception string data',
        bar: 13,
    };
    try {
        await tryCatchWrap(throwExampleErr, MySuperFancyException, 'I am a super friendly error message', data);
    } catch (ex) {
        console.error(ex.message, ex.code, ex.data, ex.err);
    }
}());

``
