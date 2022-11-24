<template>
  <div
    v-if="props.list.length > 0"
    :class="['notice-bar', className]"
    :style="{
      '--num': list.length,
      '--height': height,
      '--width': width,
      '--speed': speed / 1000 + 's',
    }"
  >
    <div class="list">
      <div
        v-for="(item, index) in [...list, list[0]]"
        :key="index"
        class="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, withDefaults, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
    list: string[];
    speed: number;
    className: string;
  }>(),
  {
    width: 200,
    height: 20,
    speed: 1000,
    list: () => [],
  }
);

const width = ref(props.width);
const height = ref(props.height);
const list = ref(props.list);
const speed = ref(props.speed);
const className = ref(props.className);

watch(
  props,
  (newVal) => {
    width.value = newVal.width;
    height.value = newVal.height;
    speed.value = newVal.speed;
    className.value = newVal.className;
    if (newVal.list.length <= 0) {
      console.error('list长度必须大于0！');
    } else {
      list.value = newVal.list;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@keyframes vertical_move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(
      0,
      calc(var(--num) * var(--height) * -1px)
    ); //纵向无限轮播
  }
}

@keyframes vertical_itemMove {
  0% {
    transform: translate(0, 0);
  }
  80%,
  100% {
    transform: translate(0, calc(var(--height) * -1px)); //纵向无限轮播
  }
}

.notice-bar {
  // display: inline-block;
  overflow: hidden;
  width: calc(var(--width) * 1px);
  height: calc(var(--height) * 1px);
  line-height: calc(var(--height) * 1px);

  .list {
    display: flex;
    flex-direction: column; //纵向无限轮播
    flex-wrap: nowrap;
    width: 100%;
    animation: vertical_move calc(var(--speed) * var(--num)) steps(var(--num))
      infinite;
    .item {
      flex-shrink: 0;
      box-sizing: border-box;
      padding: 0 10px;
      width: 100%;
      white-space: nowrap;
      animation: vertical_itemMove calc(var(--speed)) infinite;

      height: calc(var(--height) * 1px);

      @extend %singleEllipsis;
    }
  }
}
</style>
