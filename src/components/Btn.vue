<script setup lang="ts">
defineProps({
  type: {
    type: String as () => "submit" | "button",
    default: "button",
  },
});
</script>

<template>
  <div class="btn">
    <v-btn :type="type">
      <slot></slot>
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
