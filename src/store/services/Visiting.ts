import { defineStore } from "pinia";
import { ref } from "vue";
import { visitingApiInstance } from "@/api/visiting";
import type { TVisiting } from "@/types";

export const useVisitingService = defineStore("visitingService", () => {
  const visiting = ref<TVisiting[] | null>(null);

  async function createVisiting(props: { doctor: number; dateTime: number }) {
    const response = await visitingApiInstance.visitingCreate(props);

    if (response.data) {
      visiting.value = response.data.data;
    }
  }

  async function getVisiting() {
    const response = await visitingApiInstance.visitingGet();

    console.log("getVisiting", response);

    if (response.data) {
      visiting.value = response.data.data;
    }
  }

  function setVisitingState(value: null | TVisiting[]) {
    visiting.value = value;
  }

  return {
    createVisiting,
    getVisiting,
    visiting,
    setVisitingState,
  };
});
