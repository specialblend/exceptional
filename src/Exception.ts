/* eslint-disable @typescript-eslint/no-explicit-any */

export type TNewException<TCode, TData, TError> = new (...args: any[]) => IException<TCode, TData, TError>;

export interface IException<TCode, TData, TError> {
    message: string;
    code: TCode;
    err?: TError;
    data?: TData;
}

export class Exception<TCode, TData, TError> implements IException<TCode, TData, TError> {
    public message: string;
    public code: TCode;
    public data?: TData;
    public err?: TError;

    constructor(message: string, code: TCode, data?: TData, err?: TError) {
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
 * @param {TData} data payload
 * @returns {Function} wrapper class
 */
export function createExceptionWrapper<TCode, TData, TError>(Factory: TNewException<TCode, TData, TError>, message: string, code: TCode, data?: TData) {
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
export async function tryCatchWrap<TCode, TData, TError>(Factory: TNewException<TCode, TData, TError>, handler: CallableFunction): Promise<void> {
    try {
        await handler();
    } catch (err) {
        throw new Factory(err);
    }
}
