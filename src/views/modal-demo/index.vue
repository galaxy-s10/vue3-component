<template>
  <div>
    <button @click="visiable = !visiable">visiable</button>
    <Modal
      v-model="visiable"
      :show-back="true"
      :mask-closable="false"
    >
      hello world
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Modal from '@/components/Modal/index.vue';

const visiable = ref(true);
</script>

<style lang="scss" scoped></style>
