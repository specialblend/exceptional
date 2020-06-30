/* eslint-disable @typescript-eslint/no-explicit-any */

export type TNewException<TException, TPayload, TError> = new (...args: any[]) => TException;

export interface Exceptional<TPayload, TError> {
    code: string;
    message: string;
    err?: TError;
    data?: TPayload;
}

export class Exception<TPayload, TError> {
    public message: string;
    public err?: TError;
    public data?: TPayload;

    constructor(message: string, data?: TPayload, err?: TError) {
        this.message = message;
        this.data = data;
        this.err = err;
    }

    public get code(): string {
        return this.constructor.name;
    }

    /**
     * Unwrap this Exception into a JavaScript Error object.
     * @returns {Error} error
     */
    public toError(): Error {
        const message = this.formatErrorMessage();
        const err = new Error(message);
        const data = { ...this.data };
        const code = this.code;
        Object.assign(err, { data, code });
        return err;
    }

    /**
     * Cast Exception object into a new Exception of a different type, inherting this Exception's message, data and err.
     * This is useful for rethrowing an exception carrying the same payload but is intended to be routed and/or handled differently.
     * @param {Function} ExceptionTypeConstructor the new Exception constructor
     * @returns {Exception} the new Exception
     */
    public as<TException extends Exception<TPayload, TError>>(ExceptionTypeConstructor: TNewException<TException, TPayload, TError>): TException {
        return new ExceptionTypeConstructor(this.message, this.data, this.err);
    }

    /**
     * Format the error message when mapping to a  JavaScript Error object
     * @returns {string} error message
     */
    protected formatErrorMessage(): string {
        return [this.code, this.message].join(': ');
    }
}

/**
 * GenericException
 */
export class GenericException extends Exception<Record<string, any>, Error> {
}

/**
 * Wrap a JavaScript error into an GenericException
 * @param {Error} err error
 * @param {string} message message
 * @param {*} data data
 * @returns {Exception} exception
 */
export function fromError<TException extends Exception<TPayload, TError>, TPayload, TError extends Error>(err: TError, message: string = err.message, data?: TPayload): Exception<TPayload, TError> {
    return new Exception<TPayload, TError>(message, data, err);
}

/**
 * Perform a try-catch on provided handler,
 * and wrap any thrown errors as
 * @param {Function} handler handler
 * @param {Function} ExceptionTypeConstructor constructor
 * @param {string} message message to associate with the thrown Exception, defaults to caught Error message
 * @param {Object} data data to associate with the thrown Exception
 * @throws {GenericException}
 * @returns {void}
 */
export async function tryCatchWrap<TError extends Error, TPayload, TException extends Exception<TPayload, TError>>(handler: CallableFunction, ExceptionTypeConstructor?: TNewException<TException, TPayload, TError>, message?: string, data?: TPayload): Promise<void> {
    try {
        return await handler();
    } catch (err) {
        if (typeof ExceptionTypeConstructor === 'undefined') {
            throw fromError<GenericException, Record<string, any>, Error>(err, message || err.message, data).as(GenericException);
        }
        throw fromError(err, message || err.message, data).as(ExceptionTypeConstructor);
    }
}
