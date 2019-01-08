var path = require('path');
// var Html = require('html-webpack-plugin');

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, 'js')
    },
    mode: 'development', // moze byc tez production
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/, // sprawdzamy wszyskie pliki *.js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env',{
                            targets:{
                                browsers:[
                                    '> 1%',
                                    'last 2 versions'
                                ]
                            }
                        }]
                        ]}
                }
            }
        ]
    }
    // ,
    // plugins: [
    //   new Html({
    //     filename: 'index_out.html',
    //     template: './app.html'
    //   })
    // ]
};


