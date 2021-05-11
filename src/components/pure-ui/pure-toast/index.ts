import { App, createApp, ComponentPublicInstance, h, ref, reactive, Component, nextTick } from 'vue';

import _PureToast from './index.vue';
export type ToastType = 'default' | 'success' | 'warning' | 'error' | 'loading';
export type ToastPosition = 'auto' | 'top' | 'center' | 'bottom';

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
  position?: ToastPosition;
}

export class PureToast {
  type!: ToastType;
  message!: string | null;
  update(message: string | null) {
    this.__updater(message);
  }
  static show(message: string, options?: Options) {
    const toast = this.__createAndShowPureToast('default', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static success(message: string, options?: Options) {
    const toast = this.__createAndShowPureToast('success', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static warning(message: string, options?: Options) {
    const toast = this.__createAndShowPureToast('warning', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static error(message: string, options?: Options) {
    const toast = this.__createAndShowPureToast('error', message, options);
    setTimeout(() => {
      toast.clean();
    }, messageShowDuration(message));
    return toast;
  }
  static loading(message: string | null, options?: Options) {
    const toast = this.__createAndShowPureToast('loading', message, options);
    return toast;
  }
  clean() {
    if (this.__app) {
      this.__app.unmount();
    }
    if (this.__el) {
      for (const _el of document.body.children) {
        if (_el == this.__el) {
          document.body.removeChild(this.__el);
        }
      }
    }
  }

  __app!: App<Element>;
  __instance!: ComponentPublicInstance;
  __el!: HTMLDivElement;
  __updater!: ((message: string | null) => void);
  static __createAndShowPureToast(type: ToastType, message: string | null, options?: Options): PureToast {
    const toast = new PureToast();
    toast.type = type;
    toast.message = message;    
    const app = createApp({
      render() {
        return h(_PureToast, {
          options,
          model: toast,
          onClean: () => {
            toast.clean();
          },
        });
      },
    });
    const el = document.createElement('div');
    document.body.appendChild(el);
    toast.__app = app;
    toast.__el = el;
    toast.__instance = app.mount(el);
    return toast;
  }

}

export default PureToast;
