<template>
  <h1>{{ computedMessage }}</h1>
  <h1>{{ uppercasedMessage }}</h1>
  <h1>{{ setupMessage }}</h1>
  <button @click="count++">count is: {{ count }}</button>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

interface TempateObject {
  name: string;
  age?: number;
}

export default defineComponent({
  name: 'Vue3Demo',
  // 外部传入参数
  props: {
    propRequired: {
      type: String,
      required: true,
    },
    propObject: {
      // 类型注释PropType
      type: Object, //as PropType<TempateObject>,
      required: true,
      validator: (e: TempateObject) => {
        return !!e.name;
      },
    },
    propFunction: {
      // 类型注释PropType
      type: Function as PropType<() => void>,
      default: undefined,
    },
  },
  // 初始化
  setup(props) {
    console.log('> setup');
    // 初始化没有this
    console.log(this);
    // 通过props获取参数
    console.log(props.propRequired);
    // 返回值作为参数列表
    return {
      setupString: 'setupString',
      // ref修饰基本类型，可推断类型
      setupMessage: ref<string | null>('setupMessage'),
      // ref可推断类型
      setupNmuber: ref(12),
      // reactive修饰object
      setupObject: reactive<TempateObject>({ name: '' }),
      // computed修饰计算属性
      setupComputedValue: computed(() => {
        return 'setupComputedValue';
      }),
    };
  },
  // 数据源
  data() {
    return {
      message: 'hello vue3 ts',
      count: 0,
      object: {
        name: 'Jack',
        age: 3,
      } as TempateObject, // 类型转换
    };
  },
  computed: {
    // 需要注释返回类型（vue无法推断）
    computedMessage(): string {
      return this.message;
    },
    // 在使用setter进行计算时，需要对getter进行注释
    uppercasedMessage:
    {
      get(): string {
        return this.message.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      },
    },
  },

  // 生命周期函数
  beforeCreate() {
    console.log('> beforeCreate');
  },
  created() {
    console.log('> created');
  },
  beforeMount() {
    console.log('> beforeMount');
  },
  mounted() {
    console.log('> mounted');
    console.log(this.setupComputedValue);
  },
  beforeUnmount() {
    console.log('> beforeUnmount');
  },
  unmounted() {
    console.log('> unmounted');
  },
  beforeUpdate() {
    console.log('> beforeUpdate');
  },
  updated() {
    console.log('> updated');
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
