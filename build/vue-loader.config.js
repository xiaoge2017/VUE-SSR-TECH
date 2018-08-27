module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 空格换行修改
    extractCSS: !isDev, //  vue文件里的css文件单独打包
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }, // 将css中-连接的类名转化成驼峰写法
    // hotReload: false // 设置false修改文件后刷新才变化
  }
}
