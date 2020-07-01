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

export function wrap<TCode, TPayload, TError>(Factory: TNewException<TCode, TPayload, TError>, message: string, code: TCode, data?: TPayload) {
    const WrappedException = class extends Factory {
        constructor(err: TError) {
            super();
            return new Factory(message, code, data, err);
        }
    };
}
