<template>
  <v-container>
    <v-row>
      <v-col class="v-col-4 ma-auto">
        <v-form>
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

          {{message}}

        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {VContainer, VForm, VBtn, VTextField, VCol, VRow} from "vuetify/components";
export default {
  name: "FormComponent.vue",
  components: {VContainer, VForm, VBtn, VTextField, VCol, VRow},
  data() {
    return {
      form: {
        email: '',
        number: ''
      },
      message: '',
      numbersPattern: /^[0-9]*$/,
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maskedNumber: ''
    }
  },
  methods: {
    async findUsers() {
      this.form.number = this.maskedNumber.replaceAll('-', '');

      const data = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(this.form),
        headers: { 'Content-Type': 'application/json' }
      })
      // console.log(data)
      const users = await data.json()

      this.message = users.result

      // this.message = this.form
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
