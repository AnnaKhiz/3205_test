<template>
  <v-row v-if="loading">
    <v-col class="v-col-4 ma-auto">
      <v-progress-circular
        color="primary"
        :indeterminate="indeterminate"
        :size="70"
        class="mb-2"
      />
      <h3>Loading...</h3>
    </v-col>
  </v-row>
</template>

<script>
import { VProgressCircular, VRow, VCol } from "vuetify/components";

export default {
  name: "LoaderComponent.vue",
  components: {
    VProgressCircular,
    VRow,
    VCol
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
