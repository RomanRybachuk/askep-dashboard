<script setup lang="ts">
import { useUserService } from "@/store/services/User";
import { useAppStore } from "@/store";

import Logo from "@/components/Logo.vue";

import Field from "@/components/ui/Field.vue";
import Btn from "@/components/ui/Btn.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const appStore = useAppStore();

const props = defineProps({
  type: {
    type: String as () => "signin" | "signup",
    default: "signin",
  },
});

const authData = computed(() => {
  return {
    titleText:
      props.type === "signin"
        ? "Увійти в кабінет пацієнта"
        : "Зареєструватись в кабінет пацієнта",
    buttonSwitchTypeText:
      props.type === "signin" ? "Зареєструватись" : "Увійти",
    buttonSwitchTypeLink: props.type === "signin" ? "/signup" : "signin",
  };
});

const userService = useUserService();

const emailValue = ref("");
const passwordValue = ref("");

const errorMessage = ref("");

async function handleClickSubmit() {
  if (!emailValue.value || !passwordValue.value) {
    errorMessage.value = "There is some error";
  }

  errorMessage.value = "";

  appStore.addUIPageBlokers(1);

  switch (props.type) {
    case "signin":
      try {
        await userService.userSignIn(emailValue.value, passwordValue.value);

        router.push("/");
      } catch (e: any) {
        errorMessage.value = "There is some error";
      }

      break;
    case "signup":
      try {
        await userService.userSignUp(emailValue.value, passwordValue.value);

        router.push("/");
      } catch (e: any) {
        errorMessage.value = "There is some error";
      }

      break;
  }

  appStore.addUIPageBlokers(-1);
}
</script>

<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-page__inner d-flex">
        <div class="auth-page__content d-flex align-center justify-center">
          <logo :maxWidth="280"></logo>
        </div>
        <div class="auth-page__content d-flex flex-column justify-center ga-4">
          <h1>{{ authData.titleText }}</h1>
          <form
            class="auth-form d-flex flex-column ga-5"
            @submit.prevent="handleClickSubmit"
          >
            <div class="auth-form__fields d-flex flex-column ga-4">
              <field type="email" v-model="emailValue" label="Email"></field>
              <field
                type="password"
                v-model="passwordValue"
                label="Password"
              ></field>
            </div>

            <btn appendIcon="$arrowRightThin" type="submit">Відправити</btn>
            <p class="auth-form__error" v-if="errorMessage">
              {{ errorMessage }}
            </p>
          </form>
          <btn
            variant="text"
            size="small"
            :to="authData.buttonSwitchTypeLink"
            >{{ authData.buttonSwitchTypeText }}</btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-form {
  &__error {
    font-size: 14px;
    color: rgba(var(--color-danger), 1);
  }
}

.auth-page {
  &__inner {
    padding: 30px 0;
    min-height: 100vh;
  }

  &__content {
    flex: 1 0 50%;
  }
}

@media (max-width: 768px) {
  .auth-page {
    &__inner {
      flex-direction: column;
      align-items: center;
    }

    &__content {
      justify-content: flex-start !important;
    }
  }
}
</style>
