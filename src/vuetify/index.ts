import { createVuetify } from "vuetify";
import "vuetify/styles";
import { VTextField, VBtn } from "vuetify/components";

// import { aliases } from "vuetify/iconsets/mdi";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi-svg";
import { mdiAccount } from "@mdi/js";
// Icons

export default createVuetify({
  components: {
    VTextField,
    VBtn,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      account: mdiAccount,
    },
    sets: {
      mdi,
    },
  },
});
