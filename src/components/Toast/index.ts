import { createApp } from 'vue';

import main from './toast.vue';

let instance;

const initInstance = () => {
  // 这里就是与 vue2 最大的区别了
  // 在 vue2 的时候，我们只需 instance.$mount() 便能得到节点，现在不行
  const app = createApp(main);
  // 需要一个容器
  const container = document.createElement('div');
  // 再进行挂载 - 挂载之后返回实例上下文
  instance = app.mount(container);

  document.body.appendChild(container);
};

interface IOption {
  content: any;
  delay?: number;
  type?: string;
}

interface IToastCtr {
  (option: IOption | string): void;
}

interface ITypes {
  success?: IToastCtr;
  error?: IToastCtr;
  warn?: IToastCtr;
  info?: IToastCtr;
}

interface IToast extends ITypes {
  (option: IOption | string): any;
}

const Toast: IToast = function (option) {
  if (!instance) initInstance();
  // eslint-disable-next-line
  option = typeof option === 'string' ? { content: option } : option;
  const defaultOption = {
    content: '',
    delay: 1500,
    type: 'info',
  };
  Object.keys(defaultOption).forEach((key) => {
    instance[key] = option[key] || defaultOption[key];
  });
  return instance.open();
};

const types = ['success', 'error', 'warn', 'info'];
// @ts-ignore
types.forEach((type) => (Toast[type] = (content) => Toast({ content, type })));

// 直接导出该方法
export default Toast;

// 或者挂载在根实例的全局配置上
// export default app => app.config.globalProperties.$Toast = Toast
