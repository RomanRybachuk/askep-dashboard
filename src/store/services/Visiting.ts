import { defineStore } from "pinia";
import { ref } from "vue";
import { visitingApiInstance } from "@/api/visiting";
import type { TDoctor, TVisiting } from "@/types";
import { useDoctorService } from "@/store/services/Doctor";

export const useVisitingService = defineStore("visitingService", () => {
  const doctorService = useDoctorService();

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
      const doctorsData = await Promise.all(
        response.data.data.map((visit: TVisiting) =>
          doctorService.getDoctors([
            {
              prop: "id",
              strategy: "equals",
              value: visit.doctor as number,
            },
          ])
        )
      );

      visiting.value = response.data.data.map(
        (visit: TVisiting, index: number) => {
          return {
            ...visit,
            doctor: (doctorsData[index] as TDoctor[])[0],
          };
        }
      );
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
