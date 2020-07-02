import { createExceptionWrapper, Exception, IException } from './Exception';

class AuthException extends Exception<symbol, Record<string, any>, Error> implements IException<symbol, Record<string, any>, Error> {}
class AuthenticationException extends AuthException {}
class AuthorizationException extends AuthException {}

const EX_AUTH_INVALID_CREDENTIALS = Symbol('INVALID_CREDENTIALS');
const EX_AUTH_MISSING_TOKEN = Symbol('EX_AUTH_MISSING_TOKEN');
const EX_AUTH_NOT_HAS_ABILITY = Symbol('EX_AUTH_NOT_HAS_ABILITY');
const EX_AUTH_NOT_HAS_OWNERSHIP = Symbol('EX_AUTH_NOT_HAS_OWNERSHIP');

const ExceptionMessageDictionary = {
    [EX_AUTH_INVALID_CREDENTIALS]: 'The provided credentials are invalid. Please check your username and password, and try again.',
    [EX_AUTH_MISSING_TOKEN]: 'The request is missing an authenticaton token. Please refresh the app and try again.',
    [EX_AUTH_NOT_HAS_ABILITY]: 'The authenticated user does not have the ability to perform this action. Please contact your technical administrator for further assistance.',
    [EX_AUTH_NOT_HAS_OWNERSHIP]: 'The authenticated user does not have the required ownership over this resource to perform this action. Please contact your technical administrator for further assistance.',
};

class InvalidCredentialsEx extends createExceptionWrapper(
    AuthenticationException,
    ExceptionMessageDictionary[EX_AUTH_INVALID_CREDENTIALS],
    EX_AUTH_INVALID_CREDENTIALS
) {}

class MissingTokenEx extends createExceptionWrapper(
    AuthenticationException,
    ExceptionMessageDictionary[EX_AUTH_MISSING_TOKEN],
    EX_AUTH_MISSING_TOKEN
) {}

class NotHasAbilityEx extends createExceptionWrapper(
    AuthorizationException,
    ExceptionMessageDictionary[EX_AUTH_NOT_HAS_ABILITY],
    EX_AUTH_NOT_HAS_ABILITY
) {}

class NotHasOwnershipEx extends createExceptionWrapper(
    AuthorizationException,
    ExceptionMessageDictionary[EX_AUTH_NOT_HAS_OWNERSHIP],
    EX_AUTH_NOT_HAS_OWNERSHIP
) {}

describe('createExceptionWrapper', () => {
    test('is Function', () => {
        expect(createExceptionWrapper).toBeFunction();
    });
    describe('when result extended by', () => {
        describe('class InvalidCredentialsEx', () => {
            test('returns a class extending Exception', () => {
                expect(InvalidCredentialsEx).toBeFunction();
                expect(InvalidCredentialsEx.prototype).toBeInstanceOf(Exception);
            });
            describe('new InvalidCredentialsEx(Error)', () => {
                const $err = new Error('I am an ugly error.');
                const $ex = new InvalidCredentialsEx($err);
                test('inherits from expected classes', () => {
                    expect($ex).toBeInstanceOf(AuthenticationException);
                    expect($ex).toBeInstanceOf(AuthException);
                    expect($ex).toBeInstanceOf(Exception);
                });
                test('has expected properties', () => {
                    expect($ex.message).toBe(ExceptionMessageDictionary[EX_AUTH_INVALID_CREDENTIALS]);
                    expect($ex.code).toBe(EX_AUTH_INVALID_CREDENTIALS);
                    expect($ex.err).toBe($err);
                });
            });
        });
    });
});
