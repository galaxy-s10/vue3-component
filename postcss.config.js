console.log(
  '\x1B[0;37;44m INFO \x1B[0m',
  '\x1B[0;;34m ' +
    `读取了: ${__filename.slice(__dirname.length + 1)}` +
    ' \x1B[0m'
);

// 把.browserslistrc的last 2 version改成last 20 version就可以看到明显效果
module.exports = {
  plugins: [
    // 'autoprefixer',  // postcss-preset-env包含了autoprefixer的功能
    'postcss-preset-env', // 简写，具体看各个插件的官网提供几种写法
    // require('postcss-preset-env'),
    [
      'postcss-px-to-viewport',
      {
        unitToConvert: 'px',
        viewportWidth: 375,
        unitPrecision: 5, // 转化为vw后保留的小数点位
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: ['ignore-'], // 不转化以ignore-开头的样式
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: undefined,
        include: undefined,
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568,
      },
    ],
  ],
};
