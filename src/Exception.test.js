import { Exception, fromError, GenericException, tryCatchWrap } from './Exception';

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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
            });
        });
    });
});

describe('MyException class extends Exception', () => {
    class MyException extends Exception {}
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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
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

            describe('method', () => {
                describe('formatErrorMessage', () => {
                    test('is Function', () => {
                        expect($ex.formatErrorMessage).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected string', () => {
                            expect($ex.formatErrorMessage()).toBe(`${$ex.code}: ${$message}`);
                        });
                    });
                });
                describe('toError', () => {
                    test('is Function', () => {
                        expect($ex.toError).toBeFunction();
                    });
                    describe('when called', () => {
                        test('returns expected Error', () => {
                            const $err = $ex.toError();
                            expect($err).toBeInstanceOf(Error);
                            expect($err.message).toBe($ex.formatErrorMessage());
                            expect($err.code).toBe($ex.code);
                            expect($err.data).toMatchObject($data);
                        });
                    });
                });
            });
        });
    });
});

describe('fromError', () => {
    test('is Function', () => {
        expect(fromError).toBeFunction();
    });
    describe('when called', () => {
        describe('with no message, no data', () => {
            test('returns expected Exception', () => {
                const $err = new Error('something bad happened.');
                const $ex = fromError($err);
                expect($ex).toBeInstanceOf(Exception);
                expect($ex.message).toBe($err.message);
                expect($ex.data).toBeUndefined();
            });
        });
        describe('with message, with no data', () => {
            test('returns expected Exception', () => {
                const $message = 'Some fancy error message.';
                const $err = new Error('something really bad happened.');
                const $ex = fromError($err, $message);
                expect($ex).toBeInstanceOf(Exception);
                expect($ex.message).toBe($message);
                expect($ex.data).toBeUndefined();
            });
        });
        describe('with message, with no data', () => {
            test('returns expected Exception', () => {
                const $data = Symbol('data');
                const $message = 'Some really fancy error message.';
                const $err = new Error('something really bad happened.');
                const $ex = fromError($err, $message, $data);
                expect($ex).toBeInstanceOf(Exception);
                expect($ex.message).toBe($message);
                expect($ex.data).toBe($data);
            });
        });
    });
});

describe('tryCatchWrap', () => {
    test('is Function', () => {
        expect(tryCatchWrap).toBeFunction();
    });
    describe('when called', () => {
        describe('with no type constructor, no message, no data', () => {
            const $err = new Error('I am an ugly error');
            const $handler = jest.fn(() => {
                throw $err;
            });
            test('throws expected MyFancyException', async() => {
                expect.assertions(5);
                try {
                    await tryCatchWrap($handler);
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(GenericException);
                    expect($ex.message).toBe($err.message);
                    expect($ex.code).toBe('GenericException');
                    expect($ex.data).toBeUndefined();
                    expect($ex.err).toBe($err);
                }
            });
        });
        describe('with type constructor, no message, no data', () => {
            const $err = new Error('I am an ugly error');
            class MyFancyException extends Exception {}
            const $handler = jest.fn(() => {
                throw $err;
            });
            test('throws expected MyFancyException', async() => {
                expect.assertions(5);
                try {
                    await tryCatchWrap($handler, MyFancyException);
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(MyFancyException);
                    expect($ex.message).toBe($err.message);
                    expect($ex.code).toBe('MyFancyException');
                    expect($ex.data).toBeUndefined();
                    expect($ex.err).toBe($err);
                }
            });
        });
        describe('with type constructor, message, no data', () => {
            const $err = new Error('I am an ugly error');
            const $message = 'I am a user-friendly error message';
            class MyFancyException extends Exception {}
            const $handler = jest.fn(() => {
                throw $err;
            });
            test('throws expected MyFancyException', async() => {
                expect.assertions(5);
                try {
                    await tryCatchWrap($handler, MyFancyException, $message);
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(MyFancyException);
                    expect($ex.message).toBe($message);
                    expect($ex.code).toBe('MyFancyException');
                    expect($ex.data).toBeUndefined();
                    expect($ex.err).toBe($err);
                }
            });
        });
        describe('with type constructor, message, data', () => {
            const $err = new Error('I am an ugly error');
            const $message = 'I am a user-friendly error message';
            const $data = {
                foo: 'I contain information about the error',
                bar: 'and I do too',
            };
            class MyFancyException extends Exception {}
            const $handler = jest.fn(() => {
                throw $err;
            });
            test('throws expected MyFancyException', async() => {
                expect.assertions(5);
                try {
                    await tryCatchWrap($handler, MyFancyException, $message, $data);
                } catch ($ex) {
                    expect($ex).toBeInstanceOf(MyFancyException);
                    expect($ex.message).toBe($message);
                    expect($ex.code).toBe('MyFancyException');
                    expect($ex.data).toBe($data);
                    expect($ex.err).toBe($err);
                }
            });
        });
    });
});
