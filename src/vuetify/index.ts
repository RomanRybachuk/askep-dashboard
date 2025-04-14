import { createVuetify } from "vuetify";
import "vuetify/styles";
import {
  VTextField,
  VBtn,
  VAutocomplete,
  VDatePicker,
} from "vuetify/components";
import { VTimePicker } from "vuetify/labs/VTimePicker";
// import { aliases } from "vuetify/iconsets/mdi";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi-svg";
import { mdiAccount, mdiMenuDown } from "@mdi/js";
// Icons

export default createVuetify({
  components: {
    VTextField,
    VBtn,
    VAutocomplete,
    VDatePicker,
    VTimePicker,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      account: mdiAccount,
      dropdown: mdiMenuDown,
    },
    sets: {
      mdi,
    },
  },
});
