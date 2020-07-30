import 'jest-extended';

import { GenericException, tryCatchWrap } from './Exception';

class InvalidCredentialsEx extends GenericException {}

describe('tryCatchWrap', () => {
    test('is Function', () => {
        expect(tryCatchWrap).toBeFunction();
    });
    describe('when called with', () => {
        describe('class InvalidCredentialsEx', () => {
            test('throws expected Exception', async() => {
                const $err = new Error('holy f@$!- ded');
                const $ex_message = 'i am a friendly exception because i actually try to tell you things about what just';
                const $ex_data = {
                    foo: 'bar',
                    baz: 0x13122100,
                };
                try {
                    await tryCatchWrap(
                        async function handler() {
                            throw $err;
                        },
                        {
                            exception: InvalidCredentialsEx,
                            message: $ex_message,
                            data: $ex_data,
                        }
                    );
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(GenericException);
                    expect($ex).toBeInstanceOf(InvalidCredentialsEx);
                    expect($ex.code).toBe('InvalidCredentialsEx');
                    expect($ex.message).toBe($ex_message);
                    expect($ex.data).toBe($ex_data);
                    expect($ex.err).toBe($err);
                }
            });
            test('throws expected Exception', async() => {
                const $err = new Error('holy f@$!- ded');
                const $ex_message = 'i am a friendly exception because i actually try to tell you things about what just';
                const $ex_data = {
                    foo: 'bar',
                    baz: 0x13122100,
                };
                try {
                    await tryCatchWrap(
                        async function handler() {
                            throw $err;
                        },
                        {
                            exception: InvalidCredentialsEx,
                            message: $ex_message,
                            data: $ex_data,
                        }
                    );
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(GenericException);
                    expect($ex).toBeInstanceOf(InvalidCredentialsEx);
                    expect($ex.code).toBe('InvalidCredentialsEx');
                    expect($ex.message).toBe($ex_message);
                    expect($ex.data).toBe($ex_data);
                    expect($ex.err).toBe($err);
                }
            });
        });
    });
});
