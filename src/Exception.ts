/* eslint-disable @typescript-eslint/no-explicit-any */

export type ExceptionConstructor<T, PAYLOAD_TYPE, ERROR_TYPE> = new (message: string, data?: PAYLOAD_TYPE, err?: ERROR_TYPE) => T;

export class Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    public message: string;
    public err?: ERROR_TYPE;
    public data?: PAYLOAD_TYPE;

    constructor(message: string, data?: PAYLOAD_TYPE, err?: ERROR_TYPE) {
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
    public as<EXCEPTION_TYPE extends Exception<PAYLOAD_TYPE, ERROR_TYPE>>(ExceptionTypeConstructor: ExceptionConstructor<EXCEPTION_TYPE, PAYLOAD_TYPE, ERROR_TYPE>): EXCEPTION_TYPE {
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
export class GenericException extends Exception<Record<string, any>, Error> {}

/**
 * Wrap a JavaScript error into an GenericException
 * @param {Error} err error
 * @param {*} data data
 * @param {string} message message
 * @returns {Exception} exception
 */
export function fromError<ERROR_TYPE extends Error, PAYLOAD_TYPE>(err: ERROR_TYPE, data?: PAYLOAD_TYPE, message: string = err.message): Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    return new Exception<PAYLOAD_TYPE, ERROR_TYPE>(message, data, err);
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
export async function tryCatchWrap<PAYLOAD_TYPE, ERROR_TYPE, EXCEPTION_TYPE extends Exception<PAYLOAD_TYPE, ERROR_TYPE>>(handler: CallableFunction, ExceptionTypeConstructor: ExceptionConstructor<EXCEPTION_TYPE, PAYLOAD_TYPE, ERROR_TYPE>, message: string, data: PAYLOAD_TYPE): Promise<void> {
    try {
        return await handler();
    } catch (err) {
        throw fromError(err, data, message || err.message).as(ExceptionTypeConstructor);
    }
}
