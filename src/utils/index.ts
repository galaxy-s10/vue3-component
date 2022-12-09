/**
 * @description 节流函数（Promise）
 * @param {Function} fn 函数
 * @param {number} interval 间隔
 * @param {boolean} trailing 最后一次执行
 * @return {Promise}
 */
export const throttle = (fn: any, interval: number, trailing = false) => {
  let lastTime = 0;
  let timer;
  return function (...args) {
    const newTime = new Date().getTime();
    if (timer) {
      clearTimeout(timer);
    }

    let result;
    return new Promise((resolve) => {
      if (newTime - lastTime > interval) {
        // @ts-ignore
        result = fn.apply(this, args);
        resolve(result);
        lastTime = newTime;
      } else if (trailing) {
        timer = setTimeout(() => {
          // @ts-ignore
          result = fn.apply(this, args);
          resolve(result);
        }, interval);
      }
    });
  };
};

/**
 * @description: 是否支持0.5px
 * @return {*}
 */
export const supportHairlines = () => {
  const fakeBody = document.createElement('body');
  const testElement = document.createElement('div');
  testElement.style.border = '.5px solid transparent';
  fakeBody.appendChild(testElement);
  document.documentElement.appendChild(fakeBody);
  if (testElement.offsetHeight === 1) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description 正则验证手机号、邮箱是否合法
 * @param {string} str
 * @param {*} type
 * @return {*}
 */
export const regVerify = (str: string, type: 'phone' | 'email') => {
  try {
    switch (type) {
      case 'email':
        // https://ihateregex.io/expr/email
        return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(str);
      case 'phone':
        return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          str
        );
    }
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

/**
 * @description 按屏幕375为基准,生成对应的px值,默认返回单位(px)
 * @param {number} val
 * @param {*} flag
 * @return {*}
 */
export const pxToDesignPx = (val: number, flag = true) => {
  // window.screen.availWidth，值是固定的，怎么跳转浏览器大小，值都是屏幕的大小
  // window.document.documentElement.clientWidth，值是不定的，根据文档宽度决定
  // window.screen和window.document兼容性一致，兼容ie6及以上，不兼容安卓4.3及以下，其余基本没有兼容性问题。
  const px = window.document.documentElement.clientWidth * (val / 375);
  return flag ? `${px}px` : px;
};

/**
 * @description 按屏幕375为基准,生成对应的vw值,默认返回单位(vw)
 * @param {number} val
 * @param {*} flag
 * @return {*}
 */
export const pxToDesignVw = (val: number, flag = true) => {
  const vw = ((val / 375) * 100).toFixed(5);
  return flag ? `${vw}vw` : vw;
};

/**
 * @description: 模拟请求
 * @param {*} duration 1000毫秒
 * @return {*}
 */
export const mockAjax = (duration = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: 1,
          name: '张三',
          age: 18,
          token: Math.random(),
        },
      });
    }, duration);
  });
};

/**
 * @description: 获取地址栏参数（注意：请提前对url进行decodeURI或decodeURIComponent解码）
 * @return {*}
 */
export const getUrlParams = (key?: string) => {
  const url = window.location.href;
  const str = url.split('?')[1];
  const obj = {};
  if (str) {
    const keys = str.split('&');
    keys.forEach((item) => {
      const arr = item.split('=');
      obj[arr[0]] = arr[1];
    });
  }
  return key ? obj[key] : obj;
};

/**
 * @description 防抖函数（Promise）
 * @param {Function} fn 函数
 * @param {number} delay 延迟时间 默认1000毫秒
 * @param {boolean} leading 首次立即执行 默认否
 * @return {Promise}
 */
export const debounce = (fn: () => any, delay = 1000, leading = false) => {
  let timer;
  const debounceFn = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve) => {
      if (leading) {
        let isFirst = false;
        if (!timer) {
          // @ts-ignore
          resolve(fn.apply(this, args));
          isFirst = true;
        }
        timer = setTimeout(() => {
          timer = null;
          if (!isFirst) {
            // @ts-ignore
            resolve(fn.apply(this, args));
          }
        }, delay);
      } else {
        timer = setTimeout(() => {
          // @ts-ignore
          resolve(fn.apply(this, args));
        }, delay);
      }
    });
  };

  debounceFn.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounceFn;
};
