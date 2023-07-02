<template>
  <h2 class="mt-5">Login de usuario</h2>
  <FormKit type="form" id="registration-example" submit-label="Register" @submit="submitHandler" :actions="false"
    v-model="formData" incomplete-message="Por favor completa todos los campos" :classes="{ form: '$reset my-form' }">
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

      <div class="d-flex mt-4 justify-content-evenly align-items-end">
        <FormKit type="submit" label="Ingresar" :classes="{ outer: '$reset' }"
          @click="() => { this.loginFail = false; }" />
        <div>
          <div>¿No tienes cuenta?</div>
          <b-button to="/register">Registrarme</b-button>
        </div>
      </div>
    </div>
    <div v-if="loginFail" class="formkit-message">e-mail o password incorrectos </div>
  </FormKit>
</template>

<script>
import userStore from '@/stores/userStore';

export default {
  name: 'LoginUser',
  components: {
  },
  props: {
  },
  data() {
    return {
      userStore,
      loginFail: false,
      formData: {}
    };
  },
  methods: {
    async submitHandler() {
      this.loginFail = false;
      await this.userStore.loginUser(this.formData);
      if (!this.userStore.user) {
        this.loginFail = true;
      }
      this.$router.push({ name: this.userStore.isAdmin ? 'admin' : 'client' });
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
