<template>
  <v-row>
    <v-col class="v-col-4 ma-auto text-left">
      <v-table
        height="300px"
        fixed-header
      >
        <thead >
        <tr class="bg-amber">
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Number
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(user, index) in userList"
          :key="user.email + index"
        >
          <td>{{ user.email }}</td>
          <td>{{ user.number }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import { VTable, VRow, VCol } from "vuetify/components";

export default {
  name: "TableComponent.vue",
  components: {
    VTable,
    VRow,
    VCol
  },
  props: {
    userList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
