<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  itemValue: {
    required: false,
    type: String,
    default: "id",
  },
  itemTitle: {
    required: false,
    type: String,
    default: "title",
  },
  items: {
    required: true,
    type: Array,
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: "",
  },
  disabled: {
    type: Boolean as () => boolean | undefined,
    default: false,
  },
  label: {
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
  <div class="autocomplete">
    <v-autocomplete
      :label="label"
      :disabled="disabled"
      :item-title="itemTitle"
      :item-value="itemValue"
      :items="items"
      v-model="fieldValue"
    ></v-autocomplete>
  </div>
</template>

<style scoped lang="scss"></style>
