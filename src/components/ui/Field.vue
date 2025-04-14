<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: "",
  },
  type: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

let fieldValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (v: string | number) => {
    emit("update:modelValue", v);
  },
});
</script>

<template>
  <div class="field">
    <v-text-field
      hide-details
      density="compact"
      variant="solo-filled"
      :type="type"
      v-model="fieldValue"
      :label="label"
    ></v-text-field>
  </div>
</template>

<style scoped lang="scss"></style>
