<template>
  <div
    v-show="props.modelValue"
    class="modal"
  >
    <div
      class="mask"
      @click="props.maskClosable && handleClose()"
    ></div>
    <div class="container">
      <div
        v-if="props.showBack"
        class="back"
        @click="handleClose"
      ></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    showBack: boolean;
    maskClosable: boolean;
  }>(),
  {
    modelValue: false,
    showBack: true,
    maskClosable: true,
  }
);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
);

const emit = defineEmits(['update:modelValue']);
const handleClose = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 2;
  .mask {
    background: rgba(0, 0, 0, 0.45);

    // @include full(fixed);
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    padding: 20px;
    width: 320px;
    // height: 234px;
    border-radius: 10px;
    background: #ffffff;
    transform: translate(-50%, -50%);
    .title {
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 24px;
    }
    .back {
      margin-left: auto;
      width: 15px;
      height: 15px;

      // @include cross(black, 1.1px);
    }
    .content {
      color: #999999;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
