const withSASS = require('@zeit/next-sass');

module.exports = withSASS({
    publicRuntimeConfig: {
        appAddress: process.env.APPLICATION_ADDRESS,
        sessionCookieName: process.env.COOKIE_NAME
    }
});