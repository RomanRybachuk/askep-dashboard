<script setup lang="ts">
import { ref } from "vue";

import { useVisitingService } from "@/store/services/Visiting.ts";

import Autocomplete from "@/components/ui/Autocomplete.vue";

import Btn from "@/components/ui/Btn.vue";

import { timestampToDateTime, getMinDateTimeValue } from "@/utils";

import { useDoctorService } from "@/store/services/Doctor";
import type { TDoctor, TVisiting } from "@/types";
import DataLoader from "@/components/DataLoader.vue";

const doctorService = useDoctorService();
const visitingService = useVisitingService();

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

const specialtyValue = ref<string | number>("");
const dateTimeValue = ref<string>("");

// const doctors = ref<TDoctor[] | null>(null);
const doctors = ref<TDoctor[] | null>(null);

const doctorsLoading = ref(false);
const itemSelectLoading = ref<number | string>(-1);

async function handleClickSubmit() {
  doctorsLoading.value = true;
  doctors.value = null;

  const doctorsResponse = (await doctorService.getDoctors([
    {
      prop: "specialties",
      value: specialtyValue.value as string | number,
      strategy: "contains",
    },
  ])) as TDoctor[];

  doctorsLoading.value = false;

  doctors.value = doctorsResponse;
}

async function handleClickSelectDoctor(doctor: TDoctor) {
  itemSelectLoading.value = doctor.id;

  await visitingService.createVisiting({
    doctor: doctor.id,
    dateTime: new Date(dateTimeValue.value).getTime(),
    createdAt: Date.now(),
  });

  itemSelectLoading.value = -1;

  specialtyValue.value = "";
  dateTimeValue.value = "";
  doctors.value = null;
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
                v-model="specialtyValue"
              ></autocomplete>
              <input
                class="search-form__field"
                v-model="dateTimeValue"
                :min="getMinDateTimeValue()"
                type="datetime-local"
              />
            </div>

            <btn
              :disabled="!(specialtyValue && dateTimeValue && !doctorsLoading)"
              type="submit"
              >Знайти вільного лікаря</btn
            >
          </form>
        </div>
        <DataLoader v-if="doctorsLoading"></DataLoader>

        <div v-if="doctors" class="d-flex flex-column ga-2">
          <h4>Вільні лікарі</h4>
          <ul v-if="doctors.length" class="d-flex flex-column ga-5">
            <li
              class="doctor-card d-flex ga-5"
              v-for="doctor of doctors"
              :key="doctor.id"
            >
              <div class="doctor-card__photo">
                <img :src="doctor.photo" alt="doctor photo" />
              </div>
              <div class="d-flex flex-column ga-3">
                <ul class="doctor-card__features">
                  <li>Ім'я: {{ doctor.title }}</li>
                  <li>Стаж: {{ doctor.experience }} років</li>
                  <li>Лікарня: {{ doctor.clinic }}</li>
                  <li>Адреса: {{ doctor.address }}</li>
                  <li>Кабінет: {{ doctor.room }}</li>
                </ul>
                <btn
                  :loading="itemSelectLoading === doctor.id"
                  @click="handleClickSelectDoctor(doctor)"
                  variant="outlined"
                  >Обрати лікаря</btn
                >
              </div>
            </li>
          </ul>
          <div v-else>Вільних лікарів на жаль немає</div>
        </div>

        <div
          class="d-flex flex-column ga-2"
          v-else-if="!doctorsLoading && !doctors"
        >
          <h4>Ваші заплановані візити</h4>
          <div v-if="visitingService.visiting">
            <ul
              class="d-flex flex-column ga-5"
              v-if="visitingService.visiting.length"
            >
              <li
                class="visiting-card d-flex ga-5"
                v-for="visit of visitingService.visiting"
                :key="visit.id"
              >
                <div class="visiting-card__photo">
                  <img
                    :src="(visit.doctor as TDoctor).photo"
                    alt="doctor photo"
                  />
                </div>
                <div class="d-flex flex-column ga-3">
                  <ul class="visiting-card__features">
                    <li>
                      Дата та час прийому:
                      {{ timestampToDateTime(visit.dateTime) }}
                    </li>
                    <li>
                      Дата та час створення:
                      {{ timestampToDateTime(visit.dateTime) }}
                    </li>
                    <li>Лікар: {{ (visit.doctor as TDoctor).title }}</li>
                    <li>Лікарня: {{ (visit.doctor as TDoctor).clinic }}</li>
                    <li>Адреса: {{ (visit.doctor as TDoctor).address }}</li>
                    <li>Кабінет: {{ (visit.doctor as TDoctor).room }}</li>
                  </ul>
                  <btn
                    :loading="itemSelectLoading === visit.id"
                    @click="handleClickCancelVisiting(visit)"
                    variant="outlined"
                    >Скасувати візит</btn
                  >
                </div>
              </li>
            </ul>
            <div v-else>Записів не знайдено</div>
          </div>
          <data-loader v-else></data-loader>
        </div>
      </div>
    </div>
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

.home-page {
  &__inner {
    padding: 40px 0;
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

.visiting-card,
.doctor-card {
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

.doctor-card {
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
