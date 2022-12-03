<template>
  <div>
    <h2>通知栏demo</h2>
    <p>
      如果list变了，会导致重新渲染。
      <br />
      即原本list是[1,2,3]，此时滚动到2的位置了，给list尾部插入一个4，
      <br />
      此时list是[1,2,3,4]，整个组件就会重新渲染，即从1开始滚到4，不会继续从2开始滚到4。
      <br />
      一般做法是使用几个假数据，然后请求真实数据，请求到真实数据后，再将真实数据插入到list里，
      <br />
      如果我们是将真实的数据插入到原来list的尾部，那么就产生一些割裂感（明明前面的已经滚动过了，又重新滚了一次），
      我们可以将真实的数据插入到原来list的头部([4,1,2,3])，这样就能缓解割裂感（得等到用户看完了所有的list后才看出来）
    </p>
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
    <!-- <NoticeBar
      :speed="2000"
      :width="200"
      :height="20"
      :list="['555', '6666', '777']"
      class-name="notice2"
    ></NoticeBar> -->
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
const list = ref(['11', '22', '33']);

setTimeout(() => {
  list.value.unshift('44', '55');
}, 1000);

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
