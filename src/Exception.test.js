import 'jest-extended';

import { Exception, GenericException, tryCatchWrap, wrapCandy } from './Exception';

describe('Exception', () => {
    test('is Function', () => {
        expect(Exception).toBeFunction();
    });
    describe('when called', () => {
        describe('without err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            beforeAll(() => {
                try {
                    $ex = new Exception($message, $data);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of Exception', () => {
                expect($ex).toBeInstanceOf(Exception);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('Exception');
                expect($ex.err).toBeUndefined();
            });

        });
        describe('with err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            const _$err = new Error('test error!');
            beforeAll(() => {
                try {
                    $ex = new Exception($message, $data, _$err);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of Exception', () => {
                expect($ex).toBeInstanceOf(Exception);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('Exception');
                expect($ex.err).toBe(_$err);
            });

        });
    });
});

describe('GenericException', () => {
    test('is Function', () => {
        expect(GenericException).toBeFunction();
    });
    describe('when called', () => {
        describe('without err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            beforeAll(() => {
                try {
                    $ex = new GenericException($message, $data);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of GenericException', () => {
                expect($ex).toBeInstanceOf(GenericException);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('GenericException');
                expect($ex.err).toBeUndefined();
            });
        });
        describe('with err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            const _$err = new Error('test error!');
            beforeAll(() => {
                try {
                    $ex = new GenericException($message, $data, _$err);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of GenericException', () => {
                expect($ex).toBeInstanceOf(GenericException);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('GenericException');
                expect($ex.err).toBe(_$err);
            });
        });
    });
});

describe('MyException class extends Exception', () => {
    class MyException extends Exception {
    }

    test('is Function', () => {
        expect(MyException).toBeFunction();
    });
    describe('when called', () => {
        describe('without err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            beforeAll(() => {
                try {
                    $ex = new MyException($message, $data);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of MyException', () => {
                expect($ex).toBeInstanceOf(MyException);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('MyException');
                expect($ex.err).toBeUndefined();
            });

        });
        describe('with err parameter', () => {
            let $ex = null;
            const $reject = jest.fn();
            const $message = 'test error message';
            const $data = {
                foo: 'example.foo',
                bar: 'example.bar',
            };
            const _$err = new Error('test error!');
            beforeAll(() => {
                try {
                    $ex = new MyException($message, $data, _$err);
                } catch (err) {
                    $reject(err);
                }
            });

            test('does NOT throw', () => {
                expect($reject).not.toHaveBeenCalled();
            });

            test('returns instance of MyException', () => {
                expect($ex).toBeInstanceOf(MyException);
            });

            test('has expected properties', () => {
                expect($ex.message).toBe($message);
                expect($ex.data).toMatchObject($data);
                expect($ex.data).toBe($data);
                expect($ex.code).toBe('MyException');
                expect($ex.err).toBe(_$err);
            });

        });
    });
});

describe('class NotHasAbilityEx extends GenericException {}', () => {
    class NotHasAbilityEx extends GenericException {
    }
    describe('when called', () => {
        const $wrapper = {
            exception: NotHasAbilityEx,
            message: 'client does not have the ability to perform this action.',
            data: {
                action: 'ViewAnyTransaction',
                userRef: 'user@example.com',
            },
        };
        const $err = new Error('holy f@$!- i ded');
        const $ex = wrapCandy($wrapper, $err);
        test('returns expected IException', () => {
            expect($ex).toBeInstanceOf(Exception);
            expect($ex).toBeInstanceOf(GenericException);
            expect($ex).toBeInstanceOf(NotHasAbilityEx);
            expect($ex.message).toBe($wrapper.message);
            expect($ex.data).toBe($wrapper.data);
        });
        test('stringifies as expected', () => {
            expect($ex.toString()).toBe('{"code":"NotHasAbilityEx","message":"client does not have the ability to perform this action.","data":{"action":"ViewAnyTransaction","userRef":"user@example.com"},"err":{}}');
        });
        test('looks good when printed?', () => {
            $ex.print();
        });
        test.skip('looks good when thrown?', () => {
            console.log($ex);
            throw $ex;
        });
        describe('tryCatchWrap', () => {
            test('is Function', () => {
                expect(tryCatchWrap).toBeFunction();
            });
            describe('syntax is aesthetically pleasing', () => {
                test('with static handler and static wrapper', async() => {
                    try {
                        await tryCatchWrap(
                            async function handler() {
                                throw $err;
                            },
                            {
                                exception: NotHasAbilityEx,
                                message: 'client does not have the ability to perform this action.',
                                data: {
                                    action: 'ViewAnyTransaction',
                                    userRef: 'user@example.com',
                                },
                            }
                        );
                    } catch (_$ex) {
                        expect(_$ex).toBeInstanceOf(GenericException);
                        expect(_$ex).toBeInstanceOf(NotHasAbilityEx);
                        expect(_$ex.code).toBe('NotHasAbilityEx');
                        expect(_$ex.message).toBe('client does not have the ability to perform this action.');
                        expect(_$ex.data).toMatchObject({
                            action: 'ViewAnyTransaction',
                            userRef: 'user@example.com',
                        });
                        expect(_$ex.err).toBe($err);
                    }
                });
            });
        });
    });
});
