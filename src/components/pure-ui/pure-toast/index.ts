import { App, createApp, ComponentPublicInstance, h, ref, reactive, Component, nextTick } from 'vue';

import _PureToast from './index.vue';
export type ToastType = 'default' | 'success' | 'warning' | 'error' | 'loading';
export type ToastPossition = 'auto' | 'top' | 'center' | 'bottom';

/// 获取message需要展示的时长
export function messageShowDuration(message: string) {
  let n = 0;
  for (const char of message) {
    n += (/^\w+$/.test(char) ? 1 : 2);
  }
  return Math.min(Math.max(2 * n / 16, 1.5), 6) * 1000.0;
}

export interface Options {
  cls?: string;
  possiton?: ToastPossition;
}

export class PureToast {
  app!: App<Element>;
  instance!: ComponentPublicInstance;
  el!: HTMLDivElement;
  type!: ToastType;
  message!: string | null;
  update(message: string | null) {
    this.__updateHandler(message);
  }
  __updateHandler!: ((message: string | null) => void);

  static show(message: string, options?: Options) {
    const toast = this.createAndShowPureToast('default', message, options);
    setTimeout(() => {
      // toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static success(message: string, options?: Options) {
    const toast = this.createAndShowPureToast('success', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static warning(message: string, options?: Options) {
    const toast = this.createAndShowPureToast('warning', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static error(message: string, options?: Options) {
    const toast = this.createAndShowPureToast('error', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static loading(message: string | null, options?: Options) {
    const toast = this.createAndShowPureToast('loading', message, options);
    return toast;
  }
  clean() {
    if (this.app) {
      this.app.unmount();
    }
    if (this.el) {
      for (const _el of document.body.children) {
        if (_el == this.el) {
          document.body.removeChild(this.el);
        }
      }
    }
  }

  static createAndShowPureToast(type: ToastType, message: string | null, options?: Options): PureToast {
    const toast = new PureToast();
    toast.type = type;
    toast.message = message;    
    const app = createApp({
      render() {
        return h(_PureToast, {
          cls: options?.cls ?? 'pure-toast-default',
          possition: options?.possiton ?? 'auto',
          model: toast,
          onClean: () => {
            toast.clean();
          },
        });
      },
    });
    const el = document.createElement('div');
    document.body.appendChild(el);
    toast.app = app;
    toast.el = el;
    toast.instance = app.mount(el);
    return toast;
  }

}

export default PureToast;
