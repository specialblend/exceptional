/* eslint-disable @typescript-eslint/no-explicit-any */

export type TNewException<TData, TError> = new (...args: any[]) => IException<TData, TError>;

export interface IException<TData, TError> {
    message: string;
    code: string;
    err?: TError;
    data?: TData;
}

export class Exception<TData, TError> implements IException<TData, TError> {
    public message: string;
    public data?: TData;
    public err?: TError;

    get code(): string {
        return this.constructor.name;
    }

    constructor(message: string, data?: TData, err?: TError) {
        this.message = message;
        this.data = data;
        this.err = err;
    }
}

export interface ICandyWrapper<TData, TError> {
    exception: TNewException<TData, TError>;
    message: string;
    data?: TData;
}

/**
 * GenericException: An Exception with JavaScript Object payload, JavaScript Error
 */
export class GenericException extends Exception<Record<string, any>, Error> {
    public toError(): Error {
        const message = `${this.code} ${this.message} ${JSON.stringify(this.data)}`;
        const err = new Error(message);
        const data = { ...this.data };
        const code = this.code;
        Object.assign(err, { data, code });
        return err;
    }
}

/**
 * Wraps a JavaScript Error into an Exception
 * @param {ICandyWrapper} wrapper wrapper
 * @param {TError} err JavaScript Error
 * @returns {IException} new Exception
 */
export function wrapCandy<TData, TError>(wrapper: ICandyWrapper<TData, TError>, err: TError): IException<TData, TError> {
    const { exception: WrappedCandy, data, message } = wrapper;
    return new WrappedCandy(message, data, err);
}

/**
 * Calls and returns from provided async handler, or
 * catches error, wraps into Exception, and rethrows.
 * @param {Function} wrapper candy wrapper
 * @param {Function} handler async handler
 * @returns {Promise<void>} none
 */
export async function tryCatchWrap<TData, TError, TReturn>(wrapper: ICandyWrapper<TData, TError>, handler: CallableFunction): Promise<TReturn> {
    try {
        return await handler();
    } catch (err) {
        throw wrapCandy(wrapper, err);
    }
}
