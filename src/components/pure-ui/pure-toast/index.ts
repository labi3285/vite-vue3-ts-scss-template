import { App, createApp, ComponentPublicInstance, h, ref, reactive, Component, nextTick } from 'vue';

import _PureToast from './index.vue';
export type ToastType = 'default' | 'success' | 'warning' | 'error' | 'loading';

/// 获取message需要展示的时长
export function messageShowDuration(message: string) {
  let n = 0;
  for (const char of message) {
    n += (/^\w+$/.test(char) ? 1 : 2);
  }
  return Math.min(Math.max(2 * n / 16, 1.5), 6) * 1000.0;
}

export class PureToast {
  app!: App<Element>;
  instance!: ComponentPublicInstance;
  el!: HTMLDivElement;
  message?: string;

  static show(message: string) {
    const toast = this.createAndShowPureToast('default', message);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static success(message: string) {
    const toast = this.createAndShowPureToast('success', message);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static warning(message: string) {
    const toast = this.createAndShowPureToast('warning', message);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static error(message: string) {
    const toast = this.createAndShowPureToast('error', message);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static loading(message?: string) {
    const toast = this.createAndShowPureToast('loading', message);
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

  static createAndShowPureToast(type: ToastType, message?: string): PureToast {
    const toast = new PureToast();
    toast.message = message;
    const app = createApp({
      render() {
        return h(_PureToast, {
          type,
          message: toast.message,
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
