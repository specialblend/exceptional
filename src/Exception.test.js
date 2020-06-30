import exception from './Exception';

describe('main', () => {
    test('is Function', () => {
        expect(exception).toBeFunction();
    });
    describe('when called', () => {
        describe('with no arguments', () => {
            test('it returns 0', () => {
                expect(exception()).toBe(0);
            });
        });
    });
});
