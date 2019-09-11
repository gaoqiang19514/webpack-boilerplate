const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "src");
const DIST_PATH = path.resolve(__dirname, "build");
const ENTRYS_DIR = path.resolve(__dirname, "src/pages/**/*.js");

function getEntrys() {
  const resultEntry = {};
  const entryFiles = glob.sync(ENTRYS_DIR);
  entryFiles.forEach(filePath => {
    const temp = filePath.split("/");
    const key = temp[temp.length - 2];
    resultEntry[key] = filePath;
  });
  return resultEntry;
}

const entrys = getEntrys();
entrys["vendor"] = ["react", "react-dom", "axios"];

module.exports = {
  entry: entrys,

  output: {
    path: DIST_PATH,
    filename: "[name].[chunkhash:8].js", // 这里的name是根据entry的入口key决定的
    publicPath: "" //  生成到打包后的文件中的路径前缀
  },

  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|otf|woff2|svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/font/[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      "@": path.resolve("src")
    }
  },

  plugins: [
    new CleanWebpackPlugin(DIST_PATH),

    new webpack.DefinePlugin({
      root: JSON.stringify("/portal")
    })
  ]
};
