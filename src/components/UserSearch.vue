<template>
  <v-container>
    <form-component
      v-show="!loading"
      :user-list="userList"
      :loading="loading"
      @set-loading="setLoading"
      @set-message="setMessage"
      @set-user-list="setUserList"
    />

    <loader-component
      :loading="loading"
      :indeterminate="!userList.length"
    />

    <table-component
      v-if="userList.length && !loading"
      :user-list="userList"
      :loading="loading"
    />

    <v-row v-else-if="!userList.length && !loading">
      <v-col class="v-col-4 ma-auto">
        <h3>{{ message}}</h3>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {VContainer, VCol, VRow} from "vuetify/components";
import LoaderComponent from "@/components/UI/LoaderComponent.vue"
import TableComponent from "@/components/TableComponent.vue"
import FormComponent from "@/components/FormComponent.vue"
export default {
  name: "UserSearch.vue",
  components: { FormComponent, TableComponent, LoaderComponent, VContainer, VCol, VRow },
  data() {
    return {
      loading: false,
      message: '',
      userList: [],
    }
  },
  methods: {
    setLoading(value) {
      this.loading = value;
    },
    setMessage(value) {
      this.message = value;
    },
    setUserList(value) {
      this.userList = value;
    }
  }
}
</script>
