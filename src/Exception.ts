/* eslint-disable @typescript-eslint/no-explicit-any */
type Nullable<T> = T | null;

export class Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    public message: string;
    public err: Nullable<ERROR_TYPE>;
    public data: PAYLOAD_TYPE;

    constructor(message: string, data: PAYLOAD_TYPE, err: Nullable<ERROR_TYPE> = null) {
        this.message = message;
        this.data = { ...data };
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
     * Map this Exception object into a new Exception of a different type, inherting this Exception's data and metadata.
     * This is useful for rethrowing an exception carrying the same payload but is intended to be routed and/or handled differently.
     * @param {Function} ExceptionConstructor the new Exception constructor
     * @returns {Exception} the new Exception
     */
    public as<EXCEPTION_TYPE extends Exception<PAYLOAD_TYPE, ERROR_TYPE>>(ExceptionConstructor: new <P, C>(message: string, data: PAYLOAD_TYPE) => EXCEPTION_TYPE): EXCEPTION_TYPE {
        return new ExceptionConstructor<PAYLOAD_TYPE, CODE_TYPE>(this.message, this.data);
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
export function fromError<ERROR_TYPE extends Error, PAYLOAD_TYPE>(err: ERROR_TYPE, data: PAYLOAD_TYPE, message: string = err.message): Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    return new Exception<PAYLOAD_TYPE, ERROR_TYPE>(message, data, err);
}

/**
 * Perform a try-catch on provided handler,
 * and wrap any thrown errors as
 * @param {Function} handler handler
 * @param {Function} ExceptionConstructor constructor
 * @param {Object} data data to associate with the thrown Exception
 * @param {string} message message to associate with the thrown Exception, defaults to caught Error message
 * @throws {GenericException}
 * @returns {void}
 */
export async function tryCatchWrap<EXCEPTION_TYPE extends GenericException>(handler: CallableFunction, ExceptionConstructor: new () => EXCEPTION_TYPE, data: Record<string, any>, message?: string): Promise<void> {
    try {
        return await handler();
    } catch (err) {
        throw fromError(err, {}, message || err.message).as<EXCEPTION_TYPE>(ExceptionConstructor);
    }
}
