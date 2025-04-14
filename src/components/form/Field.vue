<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

let fieldValue = props.modelValue;

function handleUpdateValue(v: string) {
  fieldValue = v;

  emit("update:modelValue", fieldValue);
}
</script>

<template>
  <div class="field">
    <v-text-field
      :type="type"
      v-model="fieldValue"
      @update:modelValue="handleUpdateValue"
      :label="label"
    ></v-text-field>
  </div>
</template>

<style scoped lang="scss"></style>
