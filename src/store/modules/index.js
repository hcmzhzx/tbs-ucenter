/**
 * 传入一个目录来搜索  require.context(directory, useSubdirectories, regExp)
 * directory：说明需要检索的目录
 * useSubdirectories：是否检索子目录
 * regExp: 匹配文件的正则表达式
 **/
// 创建上下文环境
const files = require.context('.', false, /\.js$/);
const modules = {};

// 遍历传入的所有文件
// console.log(files.keys());
files.keys().forEach(key => {
   if (key === './index.js') return;
   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default modules;
