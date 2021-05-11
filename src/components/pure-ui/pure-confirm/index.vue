<template>
  <div ref="pureConfirm" class="pure-confirm" :class="cls" @click="onClickBackground($event)">
    <div class="space-top"></div>
    <div class="confirm-box" @click.stop.prevent>
      <div v-if="title !== undefined && title !== null" class="title">{{ title }}</div>
      <div v-if="message !== undefined && message !== null" class="message">{{ message }}</div>
      <div v-if="buttonActions !== undefined && buttonActions !== null && buttonActions.length > 0" class="button-box">
        <pure-button v-for="(e, i) in buttonActions" :key="i" :disabled="e.disabled" :class="'button button-' + e.type" @click="onButtonClick($event, e)">{{ e.title }}</pure-button>
      </div>
    </div>
    <div class="space-bottom"></div>
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import PureButton from '../pure-button/index.vue';
import { PureConfirm, Options, ButtonType, ButtonAction } from './index';

export default defineComponent({
  name: 'PureConfirm',
  components: {
    PureButton,
  },
  props: {
    model: {
      type: Object as PropType<PureConfirm>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
      default: null,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    return {
      cls: computed(() => props.options?.cls || 'pure-confirm-default' ),
      title: ref<string | null>(null),
      message: ref<string | null>(null),
      buttonActions: ref<ButtonAction[] | null>(null),
    };
  },
  mounted() {
    this.title = this.model.title;
    this.message = this.model.message;
    this.buttonActions = this.model.buttonActions;
    // eslint-disable-next-line vue/no-mutating-props
    this.model.__updater = (msg: string | null) => {
      this.message = msg;
    };
  },
  methods: {
    onClickBackground() {
      if (this.options?.isCloseOnTapBankground === true) {
        this.onClose();
      }
    },
    onButtonClick(event: Event, buttonAction: ButtonAction) {
      if (buttonAction.disabled !== true) {
        if (buttonAction.todo !== undefined && buttonAction.todo !== null) {
          if (buttonAction.isAutoClose === true) {
            this.onClose();
          }
          buttonAction.todo();
        } else {
          if (buttonAction.type === 'cancel') {
            this.onClose();
          }
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>