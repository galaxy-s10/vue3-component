<template>
  <div
    v-show="visible"
    class="toast"
  >
    <div class="toast-content">{{ content }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      content: '',
      type: '',
      delay: 1000,
    });

    const visible = ref(false);
    let timer;

    const close = () => {
      clearTimeout(timer);
      visible.value = false;
      timer = null;
    };

    const open = () => {
      if (timer) clearTimeout(timer);

      visible.value = true;
      timer = setTimeout(close, state.delay);

      return close;
    };

    return {
      ...toRefs(state),
      visible,
      open,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  word-break: break-all;
}
</style>
