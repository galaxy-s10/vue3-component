<template>
  <div>
    <button @click="visiable1 = !visiable1">visiable1</button>
    <button @click="visiable2 = !visiable2">visiable2</button>
    <Modal
      v-model="visiable1"
      :show-back="true"
      :mask-closable="false"
    >
      当前modal显示遮罩，点击遮罩不允许关闭
    </Modal>
    <Modal
      v-model="visiable2"
      :show-back="true"
    >
      当前modal显示遮罩，点击遮罩允许关闭
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Modal from '@/components/Modal/index.vue';

const visiable1 = ref(true);
const visiable2 = ref(false);
</script>

<style lang="scss" scoped></style>
