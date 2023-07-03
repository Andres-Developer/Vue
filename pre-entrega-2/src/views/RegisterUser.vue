
<template>
  <h2 class="mt-5">Registro de nuevo usuario</h2>
  <FormKit type="form" id="registration-user-form" submit-label="Register" @submit="submitHandler" :actions="false"
    v-model="formData" incomplete-message="Por favor completa todos los campos" :classes="{ form: '$reset my-form' }">
    <div class="outer-container">
      <h5 class="mb-5">Diligencia el siguiente formulario para registrarte</h5>
      <FormKit type="text" name="firstname" label="Nombre" placeholder="Ingresa tu nombre"
        help="¿Cómo quieres que te llamemos?" validation="required|length:3" :validation-messages="{
          length: 'Debes ingresar al menos 3 caracteres',
          required: 'Por favor ingresa un nombre',
        }" />
      <FormKit type="text" name="lastname" label="Apellido" placeholder="Ingresa tu apellido" help="¿Cuál es tu apellido?"
        validation="required|length:3" :validation-messages="{
          length: 'Debes ingresar al menos 3 caracteres',
          required: 'Por favor ingresa un apellido',
        }" />
      <FormKit type="text" name="email" label="e-mail" placeholder="usuario@email.com" help="¿Cuál es tu email?"
        validation="required|email" validation-visibility="dirty" :validation-messages="{
          email: 'Ingresa un email en formato válido',
          required: 'Por favor ingresa un e-mail',
        }" />
      <FormKit type="password" name="password" label="Contraseña"
        :validation="[['required'], ['length', 6], ['matches', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{6,}$/]]"
        prefix-icon="password" suffix-icon="eyeClosed" @suffix-icon-click="handleEyeIconClick"
        validation-visibility="dirty" :validation-messages="{
          matches: 'El password debe tener una mayúscula, una minúscula, un número y un carácter especial',
          length: 'Debes ingresar al menos 6 caracteres',
          required: 'Por favor ingresa una contraseña',
        }" placeholder="Escribe una contraseña" help="Elige un password" />
      <FormKit type="password" name="password_confirm" label="Confirma tu contraseña" placeholder="Repite tu contraseña"
        validation="required|confirm" help="Confirma tu contraseña" prefix-icon="password" suffix-icon="eyeClosed"
        @suffix-icon-click="handleEyeIconClick" validation-visibility="dirty" :validation-messages="{
          required: 'Por favor ingresa una confirmación de contraseña',
          confirm: 'Las contraseñas no coinciden',
        }" />
      <div class="d-flex mt-4 justify-content-evenly align-items-end">
        <FormKit type="submit" label="Registrar" :classes="{ outer: '$reset' }" />
        <div>
          <div>¿Ya estás registrado?</div>
          <b-button to="/login">Ingresar</b-button>
        </div>
      </div>
    </div>
    <div v-if="registerFail" class="text-danger h5"> El usuario ya se encuentra registrado </div>
  </FormKit>
</template>


<script>
import userStore from '@/stores/userStore';

export default {
  name: 'RegisterUser',
  components: {
  },
  props: {
  },
  data() {
    return {
      userStore,
      registerFail: false,
      submitted: false,
      formData: {}
    };
  },
  methods: {
    async submitHandler() {
      this.registerFail = false;

      const formDataObject = { ...this.formData }; // {...this.formData} to convert Proxy to object
      delete formDataObject.password_confirm; // remove password_confirm from formDataObject

      await this.userStore.registerUser(formDataObject);
      if (!this.userStore.user) {
        this.registerFail = true;
        return;
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

<style >
.outer-container {
  width: 650px;
  height: auto;
  border: 1px solid #e4e4e4;

  padding: 1.5em;
  border-radius: 1em;
  margin: 0 auto 1em auto;
}

.my-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.my-input {
  background-color: red;
  width: 100%;
}

.my-form {
  margin-top: 50PX;
}



h1,
h3 {
  text-align: center;
}
</style>