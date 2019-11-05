//Setup babel
require('@babel/core');
require('@babel/polyfill');
require('@babel/register')({    
    presets: ['@babel/preset-env', '@babel/preset-react'],
    ignore: [/node_modules/]
});

//Start server
require('./server/start')(process.env);