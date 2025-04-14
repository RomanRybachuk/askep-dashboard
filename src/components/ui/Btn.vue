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
  },
  disabled: {
    type: Boolean as () => boolean | undefined,
    default: false,
  },
  variant: {
    type: String as () => "outlined" | "tonal" | "text",
  },
  appendIcon: {
    type: String,
  },
  prependIcon: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="btn">
    <v-btn
      :loading="loading"
      :appendIcon="appendIcon"
      :prependIcon="prependIcon"
      density="comfortable"
      class="text-capitalize"
      :variant="variant"
      :disabled="disabled"
      :to="to"
      :type="type"
      :size="size"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
