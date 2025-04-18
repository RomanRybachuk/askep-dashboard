<script setup lang="ts">
import { computed } from "vue";
import { getMinDateTimeValue } from "@/utils";
import Autocomplete from "@/components/ui/Autocomplete.vue";
import type { TSpecialty } from "@/types";
import Btn from "@/components/ui/Btn.vue";

const props = defineProps({
  specialties: {
    required: true,
    type: Array as () => TSpecialty[],
  },
  loadingState: {
    type: Boolean,
    required: false,
    default: false,
  },
  specialty: {
    required: true,
    type: [Number, null],
  },
  dateTime: {
    required: true,
    type: [String, null],
  },
});

const emits = defineEmits([
  "handleSearch",
  "update:specialty",
  "update:dateTime",
]);

function resetFields() {
  emits("update:specialty", null);
  emits("update:dateTime", null);
}

defineExpose({ resetFields });

const specialtyModelValue = computed({
  get: () => props.specialty,
  set: (value: string) => emits("update:specialty", value),
});

const dateTimeModelValue = computed({
  get: () => props.dateTime,
  set: (value: string) => emits("update:dateTime", value),
});

async function handleClickSubmit() {
  // UI Validation
  if (props.loadingState) return;

  // Emit controller
  emits("handleSearch", {});
}
</script>

<template>
  <div class="search-content d-flex flex-column align-center ga-6">
    <h1>Знайти свого лікаря</h1>
    <form
      @submit.prevent="handleClickSubmit"
      class="search-form d-flex align-center ga-5 w-100"
    >
      <div class="search-form__fields d-flex align-center ga-5">
        <autocomplete
          class="search-form__field"
          label="Спеціальність"
          :items="specialties"
          v-model="specialtyModelValue"
        ></autocomplete>
        <input
          class="search-form__field"
          v-model="dateTimeModelValue"
          :min="getMinDateTimeValue()"
          type="datetime-local"
        />
      </div>

      <btn
        :disabled="
          !(specialtyModelValue && dateTimeModelValue && !loadingState)
        "
        type="submit"
        >Знайти вільного лікаря</btn
      >
    </form>
  </div>
</template>

<style scoped lang="scss">
.search-content {
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(var(--color-blue), 0.8);
  border: 1px solid rgba(var(--color-blue), 0.05);
  color: rgba(var(--color-white), 1);

  input {
    color: rgba(var(--color-white), 1) !important;
  }

  input[type="datetime-local"] {
    border: 1px solid rgba(var(--color-white), 1);
    border-radius: 8px;
    padding: 7px;
  }
}

.search-form {
  &__fields {
    flex: 1 0 auto;
  }

  &__field {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;

    &__fields {
      flex-direction: column;
      max-width: 500px;
      width: 100%;
    }
  }
}
</style>
