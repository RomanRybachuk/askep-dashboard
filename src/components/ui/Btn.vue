<script setup lang="ts">
defineProps({
  type: {
    type: String as () => "submit" | "button",
    default: "button",
  },
  to: {
    type: String,
  },
  size: {
    type: String as () => "small" | "large" | "normal",
    default: "small",
  },
  disabled: {
    type: Boolean as () => boolean | undefined,
    default: false,
  },
});
</script>

<template>
  <div class="btn">
    <v-btn :disabled="disabled" :to="to" :type="type" :size="size">
      <slot></slot>
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
