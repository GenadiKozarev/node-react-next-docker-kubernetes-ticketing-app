module.exports = {
    webpack: (config) => {
        // Instead of the automated file change behavior,
        // poll all the different files inside of the project directory every 3 seconds
        config.watchOptions.poll = 300;
        return config;
    },
};
