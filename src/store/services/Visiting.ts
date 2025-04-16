import { defineStore } from "pinia";
import { ref } from "vue";
import { visitingApiInstance } from "@/api/visiting";
import type { TDoctor, TVisiting } from "@/types";
import { doctorApiInstance } from "@/api/doctors";

export const useVisitingService = defineStore("visitingService", () => {
  const visiting = ref<TVisiting[] | null>(null);

  async function createVisiting(props: {
    doctor: number;
    dateTime: number;
    createdAt: number;
  }) {
    const response = await visitingApiInstance.visitingCreate(props);

    if (response.data) {
      await getVisiting();
    }
  }

  async function cancelVisiting({ id }: { id: TVisiting["id"] }) {
    const response = await visitingApiInstance.visitingCancel({
      id,
    });

    if (response.data) {
      await getVisiting();
    }
  }

  async function getVisiting() {
    const response = await visitingApiInstance.visitingGet();

    if (response.data) {
      const doctorsRequest = [];

      for (let visit of response.data.data) {
        doctorsRequest.push(
          doctorApiInstance.getDoctors([
            {
              prop: "id",
              strategy: "equals",
              value: visit.doctor,
            },
          ])
        );
      }

      const doctorsData = await Promise.all(doctorsRequest);

      visiting.value = response.data.data.map(
        (visit: TVisiting, index: number) => {
          return {
            ...visit,
            doctor: (doctorsData[index] as TDoctor[])[0],
          };
        }
      );

      console.log("visiting.value", visiting.value);
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
    cancelVisiting,
  };
});
