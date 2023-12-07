export const natsWrapper = {
    client: {
        // every time we call the 'publish' function, we actually execute the 'mockImplementation'
        publish: jest
            .fn()
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    callback();
                }
            ),
    },
};
