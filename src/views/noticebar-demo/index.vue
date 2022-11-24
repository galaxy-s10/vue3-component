<template>
  <div>
    <h2>通知栏demo</h2>
    <NoticeBar
      :speed="speed"
      :width="width"
      :height="height"
      :list="list"
      :class-name="className"
    ></NoticeBar>
    <!-- 为了让组件纯净，要让数据都让外层传递，因此不使用v-model，即不利用组件内部修改数据从而更新外部 -->
    <!-- <NoticeBar
      v-model:speed="speed"
      v-model:width="width"
      v-model:height="height"
      v-model:list="list"
      v-model:className="className"
    ></NoticeBar> -->
    <hr />
    <NoticeBar
      :speed="2000"
      :width="200"
      :height="20"
      :list="['555', '6666', '777']"
      class-name="notice2"
    ></NoticeBar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import NoticeBar from '@/components/NoticeBar/index.vue';
import { pxToDesignPx } from '@/utils';

const normalWidth = 100;
const normalHeight = 20;

const speed = ref(1000);
const width = ref(pxToDesignPx(normalWidth, false) as number);
const height = ref(pxToDesignPx(normalHeight, false) as number);
const className = ref('notice1');
const list = ref(['11', '22', '333']);

window.addEventListener('resize', () => {
  width.value = pxToDesignPx(normalWidth, false) as number;
  height.value = pxToDesignPx(normalHeight, false) as number;
});
</script>

<style lang="scss" scoped>
.notice1 {
  color: red;
  background-color: skyblue;
}
.notice2 {
  color: blue;
  background-color: orchid;
}
</style>
