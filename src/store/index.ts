import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useRoute } from "vue-router";

import type { TLayout } from "@/types";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();

  const UIPageBlokers = ref(0);

  function addUIPageBlokers(value: number) {
    UIPageBlokers.value += value;
  }

  const layoutName = computed(() => {
    return route.meta.layout as TLayout;
  });

  return { layoutName, addUIPageBlokers, UIPageBlokers };
});
