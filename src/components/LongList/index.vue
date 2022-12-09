<template>
  <div
    ref="listRef"
    class="long-list-wrap"
  >
    <!-- <div
      v-for="(item, index) in list"
      :key="index"
    ></div> -->
    <slot></slot>
    <div ref="bottomRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';

const list = ref<any[]>([]);
const listRef = ref<any>();
const bottomRef = ref<any>();

const props = defineProps({
  params: {
    type: Object,
    default() {
      return {
        current: 1,
        pages: 1,
      };
    },
  },
  list: {
    type: Array,
    default() {
      return [];
    },
  },
});

watch(
  () => props,
  (newVal) => {
    list.value = newVal.list;
  },
  {
    immediate: true,
    deep: true,
  }
);

const emits = defineEmits(['getListData']);

function getListData() {
  console.log('获取列表数据获取列表数据获取列表数据');
  emits('getListData');
}

function monitTouchBottom() {
  console.log('monitTouchBottom', bottomRef.value);
  // 距离底部50px就开始加载下一页
  const rootMargin = { top: 0, right: 0, bottom: 50, left: 0 };
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          console.log('显示');
          getListData();
        } else {
          console.log('隐藏');
        }
      });
    },
    {
      root: listRef.value,
      rootMargin: `${rootMargin.top}px ${rootMargin.right}px ${rootMargin.bottom}px ${rootMargin.left}px`,
    }
  );
  console.log(bottomRef.value);
  intersectionObserver.observe(bottomRef.value);
}

onMounted(() => {
  monitTouchBottom();
});
</script>

<style lang="scss" scoped>
@import '@/assets/global/common.scss';
@import '@/assets/global/mixin.scss';
.long-list-wrap {
  width: 100%;
  height: 100%;
}
</style>
