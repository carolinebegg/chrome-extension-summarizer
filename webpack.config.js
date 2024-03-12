const HTMLPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new HTMLPlugin({
            template: "./public/index.html",
        }),
    ],
};
