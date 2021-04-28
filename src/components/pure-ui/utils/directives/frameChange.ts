import { Directive, DirectiveBinding, VNode } from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding<() => void>, vnode: VNode<any, HTMLElement>) {
        function __update() {
            // @ts-ignore
            el.__vue_frameChange_top__ = el.offsetTop;
            // @ts-ignore
            el.__vue_frameChange_left__ = el.offsetLeft;
            // @ts-ignore
            el.__vue_frameChange_width__ = el.offsetWidth;
            // @ts-ignore
            el.__vue_frameChange_height__ = el.offsetHeight;
        }
        __update();
        // @ts-ignore
        el.__vue_frameChange_timer__ = setInterval(function() {
            if (
                // @ts-ignore
                el.__vue_frameChange_top__ !== el.offsetTop ||
                // @ts-ignore
                el.__vue_frameChange_left__ !== el.offsetLeft ||
                // @ts-ignore
                el.__vue_frameChange_width__ !== el.offsetWidth ||
                // @ts-ignore
                el.__vue_frameChange_height__ !== el.offsetHeight
            ) {
                binding.value();
                __update();
            }
        }, 100);
    },
    beforeUnmount(el: HTMLElement, binding: DirectiveBinding<() => void>, vnode: VNode<any, HTMLElement>) {
        // @ts-ignore
        clearInterval(el.__vue_frameChange_timer__);
    },
} as Directive<HTMLElement, () => void>;
