const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;



module.exports = {
    mode: 'production',
    entry: {
        'app-host': './component/index.js',
    },
    output: {
        filename: '[name].bundle.[contenthash].js',
        path:  path.resolve(__dirname, '../dist'),
        publicPath: 'https://remote-dashboard-delta.vercel.app/',
        clean: true
    },
    // resolve: {
    //     extensions: [ '.ts', '.js', '*' ],
    //     alias: {
    //         root: __dirname,
    //        src: path.resolve(__dirname, "src"),
    //     }
    //   },
    
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 100
        }
    },
    module: {
     rules: [
        {
            test: /\.(png|jpg|jpeg)$/,
            type: 'asset/resource',
            parser: {
                dataUrlCondition: {
                    maxSize: 3 * 1024
                }
            }
        },
        {
            test: /\.txt/,
            type: 'asset/source'
        },
        // {
        //     test: /\.css/,
        //     type: 'asset/source'
        // },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.scss$/,
            use: [
                // {loader: 'style-loader', options: {injectType: "linkTag" } },
                MiniCssExtractPlugin.loader,
                // {loader: 'style-loader'},
                {loader:'css-loader'},
                {loader:'sass-loader'},
                // {loader: "file-loader"}
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/env' ],
                    plugins: []
                }
            }
        }
     ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './component/index.html',
            meta: {
                description: 'Meta tag inserted from webpack'
            },
            filename: 'index.html'
        }),
        new ModuleFederationPlugin({
            name: 'AppHost',
            filename: "remoteEntry.js",
            remotes: {
                App1: 'MyApp1@https://remote-app1.vercel.app/remoteApp1.js',
                App2: 'MyApp2@https://remote-app2.vercel.app/remoteApp2.js'
            }
        })
    ]
};
