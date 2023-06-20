<template>
  <h2 class="mt-5">Login de usuario</h2>
  <FormKit type="form" id="registration-example" v-if="!submitted" submit-label="Register" @submit="submitHandler"
    :actions="false" v-model="formData" incomplete-message="Por favor completa todos los campos"
    :classes="{ form: '$reset my-form' }">
    <div class="outer-container">
      <FormKit type="text" name="email" label="e-mail" placeholder="usuario@email.com" validation="required|email"
        :validation-messages="{
          email: 'Ingresa un email en formato válido',
          required: 'Por favor ingresa un e-mail',
        }" />
      <FormKit type="password" name="password" label="Contraseña" :validation="[['required']]" prefix-icon="password"
        suffix-icon="eyeClosed" @suffix-icon-click="handleEyeIconClick" :validation-messages="{
          required: 'Por favor ingresa una contraseña',
        }" placeholder="Escribe una contraseña" />

      <FormKit type="submit" label="Ingresar" />
    </div>
  </FormKit>
  <div v-else class="mt-5 text-success">
    <h2>¡Ha iniciado sesión correctamente!</h2>
  </div>
</template>

<script>
export default {
  name: 'LoginUser',
  components: {
  },
  props: {
  },
  data() {
    return {
      submitted: false,
      formData: {}
    };
  },
  methods: {
    async submitHandler() {
      await new Promise((r) => setTimeout(r, 1000));
      this.submitted = true;
      console.log("formData: ", this.formData);
    },
    handleEyeIconClick(node) {
      node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
      node.props.type = node.props.type === 'password' ? 'text' : 'password';
    }
  },
  computed: {
  },
};
</script>

<style></style>
