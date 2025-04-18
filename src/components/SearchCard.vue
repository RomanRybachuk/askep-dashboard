<script setup lang="ts">
import { timestampToDateTime } from "@/utils";

import Btn from "@/components/ui/Btn.vue";

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
  features: {
    required: true,
    type: Array as () => { title: string; id: string }[],
  },
  loadingState: {
    required: false,
    type: Boolean,
    default: false,
  },
  image: {
    required: false,
    type: String,
    default: "photo",
  },
  action: {
    required: false,
    type: String,
    default: "Action",
  },
});

const dateFormat = {
  dateTime: (value: number) => timestampToDateTime(value),
};

const emits = defineEmits(["handleSelectItem"]);

function handleClickButton() {
  if (props.loadingState) return;

  emits("handleSelectItem", props.item);
}

function showItemValue(key: string) {
  return key.split(".").reduce((accumulator, path) => {
    const [k, format] = path.split(":") as [string, "dateTime" | undefined];

    return format ? dateFormat[format](accumulator[k]) : accumulator[k];
  }, props.item);
}
</script>

<template>
  <li class="search-card d-flex ga-5" :key="item.id">
    <div class="search-card__photo">
      <img :src="showItemValue(props.image) as any" alt="doctor photo" />
    </div>
    <div class="d-flex flex-column ga-3">
      <ul class="search-card__features">
        <li v-for="feature of features" :key="feature.id">
          {{ feature.title }}: {{ showItemValue(feature.id) }}
        </li>
      </ul>
      <btn
        v-if="action"
        :loading="loadingState"
        @click="handleClickButton()"
        variant="outlined"
        >{{ action }}</btn
      >
    </div>
  </li>
</template>

<style scoped lang="scss">
.search-card {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(var(--color-sky), 0.1);
  font-size: 14px;

  &__photo {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
