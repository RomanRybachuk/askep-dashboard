<script setup lang="ts">
import { ref } from "vue";

import { useVisitingService } from "@/store/services/Visiting.ts";
import SearchForm from "@/components/SearchForm.vue";

import { useDoctorService } from "@/store/services/Doctor";
import type { TDoctor, TVisiting } from "@/types";
import DataLoader from "@/components/DataLoader.vue";
import SearchCard from "@/components/SearchCard.vue";

const doctorService = useDoctorService();
const visitingService = useVisitingService();

const searchFormComponent = ref<InstanceType<typeof SearchForm> | null>(null);

const specialties = [
  { id: 1, title: "Терапевт" },
  { id: 2, title: "Педіатр" },
  { id: 3, title: "Кардіолог" },
  { id: 4, title: "Невролог" },
  { id: 5, title: "Травматолог" },
  { id: 6, title: "Дерматолог" },
  { id: 7, title: "Психіатр" },
  { id: 8, title: "Алерголог" },
];

const specialtyValue = ref<number | null>(null);
const dateTimeValue = ref<string | null>(null);

const doctorsLoading = ref(false);
const itemSelectLoading = ref<number | string>(-1);

async function handleSearch({}) {
  doctorsLoading.value = true;

  // Reset doctor list store value
  doctorService.setDoctors(null);

  await doctorService.getDoctors([
    {
      prop: "specialties",
      value: specialtyValue.value as number,
      strategy: "contains",
    },
  ]);

  doctorsLoading.value = false;
}

async function handleClickSelectDoctor(doctor: TDoctor) {
  itemSelectLoading.value = doctor.id;

  await visitingService.createVisiting({
    doctor: doctor.id,
    dateTime: new Date(dateTimeValue.value as string).getTime(),
    createdAt: Date.now(),
  });

  itemSelectLoading.value = -1;

  // View trigger
  searchFormComponent.value?.resetFields();

  doctorService.setDoctors(null);
}

async function handleClickCancelVisiting(visiting: TVisiting) {
  itemSelectLoading.value = visiting.id;

  await visitingService.cancelVisiting({
    id: visiting.id,
  });

  itemSelectLoading.value = -1;
}
</script>

<template>
  <div class="home-page">
    <div class="container">
      <div class="home-page__inner d-flex flex-column ga-4">
        <SearchForm
          ref="searchFormComponent"
          v-model:specialty="specialtyValue"
          v-model:dateTime="dateTimeValue"
          @handleSearch="handleSearch"
          :specialties="specialties"
          :search-loading-state="doctorsLoading"
        ></SearchForm>
        <DataLoader v-if="doctorsLoading"></DataLoader>

        <div v-if="doctorService.doctors" class="d-flex flex-column ga-2">
          <h4>Вільні лікарі</h4>
          <ul
            v-if="doctorService.doctors.length"
            class="d-flex flex-column ga-5"
          >
            <SearchCard
              @handleSelectItem="handleClickSelectDoctor"
              v-for="doctor of doctorService.doctors"
              :item="doctor"
              action="Створити візит"
              :features="[
                {
                  id: 'title',
                  title: `Ім'я`,
                },
                {
                  id: 'experience',
                  title: 'Досвід',
                },
                {
                  id: 'clinic',
                  title: 'Лікарня',
                },
                {
                  id: 'address',
                  title: 'Адреса',
                },
                {
                  id: 'room',
                  title: 'Кабінет',
                },
              ]"
              :loading-state="itemSelectLoading === doctor.id"
            ></SearchCard>
          </ul>
          <div v-else>Вільних лікарів на жаль немає</div>
        </div>

        <div
          class="d-flex flex-column ga-2"
          v-else-if="!doctorsLoading && !doctorService.doctors"
        >
          <h4>Ваші заплановані візити</h4>
          <div v-if="visitingService.visiting">
            <ul
              class="d-flex flex-column ga-5"
              v-if="visitingService.visiting.length"
            >
              <SearchCard
                @handleSelectItem="handleClickCancelVisiting"
                v-for="visit of visitingService.visiting"
                :item="visit"
                image="doctor.photo"
                action="Скасувати візит"
                :features="[
                  {
                    id: 'dateTime:dateTime',
                    title: `Дата та час прийому`,
                  },
                  {
                    id: 'createdAt:dateTime',
                    title: 'Дата та час створення',
                  },
                  {
                    id: 'doctor.title',
                    title: 'Лікар',
                  },
                  {
                    id: 'doctor.clinic',
                    title: 'Лікарня',
                  },
                  {
                    id: 'doctor.address',
                    title: 'Адреса',
                  },
                  {
                    id: 'doctor.room',
                    title: 'Кабінет',
                  },
                ]"
                :loading-state="itemSelectLoading === visit.id"
              ></SearchCard>
            </ul>
            <div v-else>Записів не знайдено</div>
          </div>
          <DataLoader v-else></DataLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  &__inner {
    padding: 40px 0;
  }
}
</style>
