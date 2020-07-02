/* eslint-disable @typescript-eslint/no-explicit-any */

export type TNewException<TCode, TPayload, TError> = new (...args: any[]) => IException<TCode, TPayload, TError>;

export interface IException<TCode, TPayload, TError> {
    message: string;
    code: TCode;
    err?: TError;
    data?: TPayload;
}

export class Exception<TCode, TPayload, TError> implements IException<TCode, TPayload, TError> {
    public message: string;
    public code: TCode;
    public data?: TPayload;
    public err?: TError;

    constructor(message: string, code: TCode, data?: TPayload, err?: TError) {
        this.message = message;
        this.code = code;
        this.data = data;
        this.err = err;
    }

    public toError(): Error {
        const message = this.formatErrorMessage();
        const err = new Error(message);
        const data = { ...this.data };
        const code = this.code;
        Object.assign(err, { data, code });
        return err;
    }

    protected formatErrorMessage(): string {
        return [this.code, this.message].join(': ');
    }
}

/**
 * GenericException: An Exception with string code, JavaScript Object payload, JavaScript Error
 */
export class GenericException extends Exception<string, Record<string, any>, Error> {}

/**
 * Returns a class extending `Factory` which can wrap JavaScript errors using `new` syntax
 * @param {Function} Factory parent class to extend
 * @param {string} message message
 * @param {TCode} code exception code
 * @param {TPayload} data payload
 * @returns {Function} wrapper class
 */
export function createExceptionWrapper<TCode, TPayload, TError>(Factory: TNewException<TCode, TPayload, TError>, message: string, code: TCode, data?: TPayload) {
    return class extends Factory {
        constructor(err: TError) {
            super();
            return new Factory(message, code, data, err);
        }
    };
}

/**
 * Calls provided async handler, wraps unhandled Error into Exception and rethrows.
 * @param {Function} Factory parent class to extend
 * @param {Function} handler async handler
 * @returns {Promise<void>} none
 */
export async function tryCatchWrap<TCode, TPayload, TError>(Factory: TNewException<TCode, TPayload, TError>, handler: CallableFunction): Promise<void> {
    try {
        await handler();
    } catch (err) {
        throw new Factory(err);
    }
}
