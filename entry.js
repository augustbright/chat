//Setup babel
require('@babel/core');
require('@babel/polyfill');
require('@babel/register')({    
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    ignore: [/node_modules/],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
});

//Start server
require('./server/start')(process.env);