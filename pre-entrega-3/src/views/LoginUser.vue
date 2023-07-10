<template>
  <h2 class="mt-5">Iniciar sesión</h2>
  <FormKit type="form" id="login-user-form" submit-label="Register" @submit="submitHandler" :actions="false"
    v-model="formData" incomplete-message="Por favor completa todos los campos" :classes="{ form: '$reset my-form' }">
    <div class="outer-container">
      <FormKit type="text" name="email" label="e-mail" placeholder="admin@gmail.com o cliente@gmail.com"
        validation="required|email" validation-visibility="dirty" :validation-messages="{
          email: 'Ingresa un email en formato válido',
          required: 'Por favor ingresa un e-mail',
        }" />
      <FormKit type="password" name="password" label="Contraseña" :validation="[['required']]" prefix-icon="password"
        suffix-icon="eyeClosed" @suffix-icon-click="handleEyeIconClick" :validation-messages="{
          required: 'Por favor ingresa una contraseña',
        }" placeholder="123456" />

      <div class="d-flex mt-4 justify-content-evenly align-items-end">
        <FormKit type="submit" label="Ingresar"
          :classes="{ outer: '$reset', input: 'btn-chip p-4 d-flex align-items-center' }"
          @click="() => { this.loginFail = false; }" />
        <div>
          <div>¿No tienes cuenta?</div>
          <b-button to="/register" class="btn-chip p-4 d-flex align-items-center">Registrarme</b-button>
        </div>
      </div>
    </div>
    <div v-if="loginFail" class="text-danger h5">e-mail o password incorrectos </div>
  </FormKit>
</template>

<script>
// import userStore from '@/stores/userStore';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginUser',
  components: {
  },
  props: {
  },
  data() {
    return {
      // userStore,
      loginFail: false,
      formData: {}
    };
  },
  methods: {
    ...mapActions('userModule', ['loginUser']),
    async submitHandler() {
      this.loginFail = false;
      // await this.userStore.loginUser(this.formData);
      await this.loginUser(this.formData);
      // if (!this.userStore.user) {
      //   this.loginFail = true;
      // }
      if (!this.user) {
        this.loginFail = true;
      }
      // this.$router.push({ name: this.userStore.user.isAdmin ? 'admin' : 'client' });
      this.$router.push({ name: this.user.isAdmin ? 'admin' : 'client' });
    },
    handleEyeIconClick(node) {
      node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
      node.props.type = node.props.type === 'password' ? 'text' : 'password';
    }
  },
  computed: {
    ...mapGetters('userModule', ['getUser']),
    user() {
      return this.getUser;
    }
  },
};
</script>

<style></style>
