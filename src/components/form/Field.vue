<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="field">
    <v-text-field :label="label"></v-text-field>
  </div>
</template>

<style scoped lang="scss"></style>
