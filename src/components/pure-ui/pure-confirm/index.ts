import { App, createApp, ComponentPublicInstance, h, ref, reactive, Component, nextTick } from 'vue';

import _PureConfirm from './index.vue';

export type ButtonType = 'default' | 'danger' | 'alert' | 'cancel';
export interface ButtonAction {
  type?: ButtonType;
  title: string;
  /// default: false
  disabled?: boolean;
  /// default: true
  isAutoClose?: boolean;
  todo?: () => void;
}

export interface Options {
  cls?: string;
  /// default: false
  isCloseOnTapBankground?: boolean;
}

export class PureConfirm {
  title!: string | null;
  message!: string | null;
  buttonActions!: ButtonAction[] | null;
  update(message: string | null) {
    this.__updater(message);
  }

  static show(title: string | null, message: string | null, buttonActions: ButtonAction[] | null, options?: Options) {
    return this.__createAndShowPureConfirm(title, message, buttonActions, options);
  }

  close() {
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
  static __createAndShowPureConfirm(title: string | null, message: string | null, buttonActions: ButtonAction[] | null, options?: Options): PureConfirm {
    const confirm = new PureConfirm();
    confirm.title = title;    
    confirm.message = message;    
    confirm.buttonActions = buttonActions;
    const app = createApp({
      render() {
        return h(_PureConfirm, {
          options,
          model: confirm,
          onClose: () => {
            confirm.close();
          },
        });
      },
    });
    const el = document.createElement('div');
    document.body.appendChild(el);
    confirm.__app = app;
    confirm.__el = el;
    confirm.__instance = app.mount(el);
    return confirm;
  }

}

export default PureConfirm;
