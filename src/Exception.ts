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

    toString(): string {
        // return `<${this.code} message='${this.message}' data='${JSON.stringify(this.data)}' />`;
        const { code, message, data, err } = this;
        return JSON.stringify({ code, message, data, err });
    }

    print(): void {
        console.log(this.code, this.message, this.data, this.err);
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
export class GenericException extends Exception<Record<string, any>, Error> {}

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
 * @param {Function} handler async handler
 * @param {Function} wrapper candy wrapper
 * @returns {Promise<void>} none
 */
export async function tryCatchWrap<TData, TError, TReturn>(handler: CallableFunction, wrapper: ICandyWrapper<TData, TError>): Promise<TReturn> {
    try {
        return await handler();
    } catch (err) {
        throw wrapCandy(wrapper, err);
    }
}
