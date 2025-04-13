import { defineStore } from "pinia";
import { computed } from "vue";

import { useRoute } from "vue-router";

import type { TLayout } from "@/types";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();

  const layoutName = computed(() => {
    return route.meta.layout as TLayout;
  });

  return { layoutName };
});
