<template>
  <div>
    <!-- <ToastDemo></ToastDemo> -->
    <!-- <NoticebarDemo></NoticebarDemo> -->
    <!-- <ModalDemo></ModalDemo> -->
    <dnd-demo></dnd-demo>
    <div class="cross-ico"></div>
    <div class="flex1"></div>
    <div class="flex2"></div>
  </div>
</template>

<script lang="ts" setup>
import DndDemo from './views/dnd-demo/index.vue';
import ModalDemo from './views/modal-demo/index.vue';
import NoticebarDemo from './views/noticebar-demo/index.vue';
import ToastDemo from './views/toast-demo/index.vue';
</script>

<style lang="scss" scoped>
.cross-ico {
  width: 30px;
  height: 30px;
  @include cross(red, 2px);
}
.flex1 {
  color: red;
  @extend %flexCenter;
}
.flex2 {
  color: blue;
  @extend %flexCenter;
}
.txt {
  font-size: px2vw(20);
}
</style>
