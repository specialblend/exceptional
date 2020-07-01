import { Exception, GenericException, wrap } from './Exception';

describe('wrap', () => {
    test('returns expected Exception', () => {
        class AuthException extends GenericException {}
        class AuthenticationException extends AuthException {}
        class AuthorizationException extends AuthException {}
        class InvalidCredentialsEx extends AuthenticationException {}
        class MissingTokenEx extends AuthenticationException {}
        class NotHasAbilityEx extends AuthorizationException {}
        class NotHasOwnershipEx extends AuthorizationException {}

    });
});
