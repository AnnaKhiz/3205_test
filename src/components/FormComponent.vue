<template>
  <v-row>
    <v-col class="v-col-4 ma-auto">
      <v-form >
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
</template>

<script>
import { VForm, VBtn, VTextField, VCol, VRow } from "vuetify/components";

export default {
  name: "FormComponent.vue",
  components: {
    VForm,
    VBtn,
    VTextField,
    VCol,
    VRow
  },
  props: {
    userList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {
        email: '',
        number: ''
      },
      maskedNumber: '',
      numbersPattern: /^[0-9]*$/,
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      currentController: null
    }
  },
  emits: ['set-loading', 'set-user-list', 'set-message'],
  methods: {
    async findUsers() {
      this.$emit('set-loading', true);
      this.$emit('set-user-list', []);

      if (this.currentController) {
        this.currentController.abort();
      }

      this.form.number = this.maskedNumber.replaceAll('-', '');

      this.currentController = new AbortController();

      try {
        const data = await fetch('/users', {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: { 'Content-Type': 'application/json' },
          signal: this.currentController.signal
        })

        const users = await data.json();

        if (!users.result.length) {
          this.$emit('set-message', "Users not found");
          this.$emit('set-loading', false);
          return
        }

        this.$emit('set-user-list', users.result);
        this.$emit('set-loading', false);

      } catch(error) {
        if (error.name === 'AbortError') {
          console.error('Fetch canceled')
        } else {
          console.error(`Error: ${error}`)
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
