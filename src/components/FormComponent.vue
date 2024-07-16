<template>
  <v-container>
    <v-row>
      <v-col class="v-col-4 ma-auto">
        <v-form v-if="!loading">
          <v-text-field
            v-model="form.email"
            :rules="[emailRules]"
            placeholder="Enter e-mail"
            label="E-mail"
            required
          />

          <v-text-field
            v-model="maskedNumber"
            :rules="[onlyNumbers]"
            placeholder="Enter number"
            label="Number"
            v-mask="'##-##-##'"
          />

          <v-btn
            :disabled="!form.email || !emailPattern.test(form.email)"
            class="me-4"
            @click.prevent="findUsers"
          >
            Submit
          </v-btn>

          </v-form>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col class="v-col-4 ma-auto">
        <v-progress-circular
          color="primary"
          :indeterminate="!userList.length"
          :size="70"
          class="mb-2"
        />
        <h3>Loading...</h3>
      </v-col>
    </v-row>


    <v-row v-if="userList.length && !loading">
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
    <v-row v-else-if="!userList.length && !loading">
      <v-col class="v-col-4 ma-auto">
        <h3>{{ message}}</h3>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {VContainer, VForm, VBtn, VTextField, VCol, VRow, VTable, VProgressCircular} from "vuetify/components";
export default {
  name: "FormComponent.vue",
  components: {VContainer, VForm, VBtn, VTextField, VCol, VRow, VTable, VProgressCircular},
  data() {
    return {
      loading: false,
      form: {
        email: '',
        number: ''
      },
      message: '',
      userList: [],
      numbersPattern: /^[0-9]*$/,
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maskedNumber: '',
      currentController: null
    }
  },
  methods: {
    async findUsers() {
      this.loading = true;
      this.userList = [];
      if (this.currentController) {
        this.currentController.abort()

      }

      this.form.number = this.maskedNumber.replaceAll('-', '');

      this.currentController = new AbortController();

      console.log( this.currentController)

      try {
        const data = await fetch('/users', {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: { 'Content-Type': 'application/json' },
          signal: this.currentController.signal
        })

        const users = await data.json();

        if (!users.result.length) {
          this.message = "Users not found";
          this.loading = false;
          return
        }
        console.log(users.result)
        this.userList = users.result;
        this.loading = false;


      } catch(error) {
        if (error.name === 'AbortError') {
          console.log('Fetch canceled')
        } else {
          console.log(`Error: ${error}`)
        }
      }



    },
    onlyNumbers(value) {
      return this.numbersPattern.test(value.replace(/-/g, '')) || 'Only digits allowed!';
    },
    emailRules(value) {
      return this.emailPattern.test(value) || 'Email format should be: email@mail.com';
    },
  }
}
</script>

<style scoped>

</style>
