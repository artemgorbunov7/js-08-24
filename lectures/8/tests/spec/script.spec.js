const script = require('../script');

describe('pow()', () => {
    it('Должна возвращать 9 при аргументах 3 и 2', () => {
        const result = script.pow(3, 2);
        expect(result).toBe(9);
    });

    it('Должна возвращать null при аргументах null и 10', () => {
        const result = script.pow(null, 10);
        expect(result).toBeNull();
    });

    it('Должна возвращать null при аргументах 10 и null', () => {
        const result = script.pow(10, null);
        expect(result).toBeNull();
    });
});
