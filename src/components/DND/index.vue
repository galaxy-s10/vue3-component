<template>
  <div
    ref="wifiRef"
    class="dragMove-wrap"
    @click.self="emits('handleWrapClick')"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  ></div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue';

import { throttle } from '@/utils';

const offset = reactive({
  x: 0,
  y: 0,
});
const wifiRef = ref<HTMLElement>();
function move(event: TouchEvent) {
  if (!wifiRef.value) return;
  wifiRef.value.style.top = `${event.targetTouches[0].pageY - offset.y}px`;
  wifiRef.value.style.left = `${event.targetTouches[0].pageX - offset.x}px`;
}
const touchmove = throttle(move, 10);

const emits = defineEmits(['handleWrapClick']);

function touchstart(event: TouchEvent) {
  if (!wifiRef.value) return;
  offset.x =
    event.targetTouches[0].pageX - wifiRef.value.getBoundingClientRect().x;
  offset.y =
    event.targetTouches[0].pageY - wifiRef.value.getBoundingClientRect().y;
}
function touchend() {
  if (!wifiRef.value) return;
  const rect = wifiRef.value.getBoundingClientRect();
  const width = screen.width;
  wifiRef.value.style.transition = 'all .5s ease';
  if (rect.x > width / 2) {
    setTimeout(() => {
      wifiRef.value!.style.left = `${width - rect.width}px`;
    }, 0);
  } else {
    setTimeout(() => {
      wifiRef.value!.style.left = '0px';
    }, 0);
  }
  setTimeout(() => {
    wifiRef.value!.style.removeProperty('transition');
  }, 500);
}
</script>

<style lang="scss" scoped>
.dragMove-wrap {
  width: 52px;
  height: 52px;
  position: fixed;
  top: 10%;
  right: 0;
  background-color: red;
}
</style>
