import { createExceptionWrapper, Exception, IException } from './Exception';

class AuthException extends Exception<symbol, Record<string, any>, Error> implements IException<symbol, Record<string, any>, Error> {}
class AuthenticationException extends AuthException {}
class AuthorizationException extends AuthException {}

const EX_AUTH_INVALID_CREDENTIALS = Symbol('INVALID_CREDENTIALS');
const EX_AUTH_MISSING_TOKEN = Symbol('EX_AUTH_MISSING_TOKEN');
const EX_AUTH_NOT_HAS_ABILITY = Symbol('EX_AUTH_NOT_HAS_ABILITY');
const EX_AUTH_NOT_HAS_OWNERSHIP = Symbol('EX_AUTH_NOT_HAS_OWNERSHIP');

class InvalidCredentialsEx extends createExceptionWrapper(
    AuthenticationException,
    'The provided credentials are invalid. Please check your username and password, and try again.',
    EX_AUTH_INVALID_CREDENTIALS
) {}

class MissingTokenEx extends createExceptionWrapper(
    AuthenticationException,
    'The request is missing an authenticaton token. Please refresh the app and try again.',
    EX_AUTH_MISSING_TOKEN
) {}

class NotHasAbilityEx extends createExceptionWrapper(
    AuthorizationException,
    'The authenticated user does not have the ability to perform this action. Please contact your technical administration for further assistance.',
    EX_AUTH_NOT_HAS_ABILITY
) {}
class NotHasOwnershipEx extends createExceptionWrapper(
    AuthorizationException,
    'The provided credentials are invalid. Please check your username and password, and try again.',
    EX_AUTH_NOT_HAS_OWNERSHIP
) {}

describe('createExceptionWrapper', () => {
    test('returns expected Exception', () => {
        const err = new Error('I am ugly error.');
        throw new InvalidCredentialsEx(err);
    });
});
