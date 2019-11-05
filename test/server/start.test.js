import start from '../../server/start';

describe('Server start', () => {
    test('Server should start', async () => {
        const started = await start(process.env);
        expect(started).toBe(true);
    });
});
