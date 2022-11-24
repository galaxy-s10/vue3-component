<template>
  <div></div>
</template>

<script lang="ts" setup>
import Toast from '@/components/Toast';

Toast.success?.('123');
Toast.error?.('123');
Toast.info?.('123');
Toast.warn?.('123');
Toast('123');
</script>

<style lang="scss" scoped></style>
