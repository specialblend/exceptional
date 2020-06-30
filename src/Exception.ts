interface Serializable {
    toString: () => string
}

export interface ExceptionMetadata {
    message: string,
    code: string,
}

export interface WrappedErrorExceptionPayload {
    err: Error,
}

type Nullable<T> = T | null;

export class Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    private metadata: ExceptionMetadata;
    private data: PAYLOAD_TYPE;
    private err: Nullable<ERROR_TYPE>;

    constructor(metadata: ExceptionMetadata, data: PAYLOAD_TYPE, err: Nullable<ERROR_TYPE> = null) {
        const { message, code } = metadata;
        this.metadata = { message, code };
        this.data = { ...data };
        this.err = err;
    }

    /**
     * Unwrap this Exception into a JavaScript Error object.
     * @returns {Error} error
     */
    public toError(): Error {
        const message = this.formatErrorMessage();
        const { data, metadata } = this;
        const err = new Error(message);
        Object.assign(err, { metadata, data });
        return err;
    }

    /**
     * Format the error message when mapping to a  JavaScript Error object
     * @returns {string} error message
     */
    protected formatErrorMessage(): string {
        return [this.metadata.code, this.metadata.message].join(': ');
    }

    /**
     * Map this Exception object into a new Exception of a different type, inherting this Exception's data and metadata.
     * This is useful for rethrowing an exception carrying the same payload but is intended to be routed and/or handled differently.
     * @param {Function} ExceptionConstructor the new Exception constructor
     * @returns {Exception} the new Exception
     */
    public as<EXCEPTION_TYPE extends Exception<PAYLOAD_TYPE, ERROR_TYPE>>(ExceptionConstructor: new <P, C>(metadata: ExceptionMetadata, data: PAYLOAD_TYPE) => EXCEPTION_TYPE): EXCEPTION_TYPE {
        return new ExceptionConstructor<PAYLOAD_TYPE, CODE_TYPE>(this.metadata, this.data);
    }
}

/**
 * GenericException
 */
export type GenericException = Exception<Record<string, any>, Error>;

/**
 * Wrap a JavaScript error into an GenericException
 * @param {Error} err error
 * @param {string} code code
 * @param {*} data data
 * @returns {Exception} exception
 */
export function fromError<PAYLOAD_TYPE, ERROR_TYPE extends Error>(err: ERROR_TYPE, code: string, data: PAYLOAD_TYPE): Exception<PAYLOAD_TYPE, ERROR_TYPE> {
    const { message } = err;
    const metadata = { message, code };
    return new Exception<PAYLOAD_TYPE, ERROR_TYPE>(metadata, data, err);
}

/**
 * Perform a try-catch on provided handler,
 * and wrap any thrown errors as
 * @param {Function} handler handler
 * @param {Function} ExceptionConstructor constructor
 * @param {string} code code
 * @throws {GenericException}
 * @returns {void}
 */
export async function tryCatchWrap<EXCEPTION_TYPE extends GenericException>(handler: CallableFunction, ExceptionConstructor: new () => EXCEPTION_TYPE, code: string): Promise<void> {
    try {
        return await handler();
    } catch (err) {
        throw fromError(err, code, {}).as<EXCEPTION_TYPE>(ExceptionConstructor);
    }
}
