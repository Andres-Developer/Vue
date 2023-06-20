
<template>
  <h2 class="mt-5">Registro de nuevo usuario</h2>
  <FormKit type="form" id="registration-example" v-if="!submitted" submit-label="Register" @submit="submitHandler"
    :actions="false" v-model="formData" incomplete-message="Por favor completa todos los campos" :classes="{ form: '$reset my-form' }">
    <div class="outer-container">
      <h5 class="mb-5">Diligencia el siguiente formulario para registrarte</h5>
      <FormKit type="text" name="name" label="Nombre" placeholder="Ingresa tu nombre"
        help="¿Cómo quieres que te llamemos?" validation="required|length:3" :validation-messages="{
          length: 'Debes ingresar al menos 3 caracteres',
          required: 'Por favor ingresa un nombre',
        }" />
      <FormKit type="text" name="email" label="e-mail" placeholder="usuario@email.com" help="¿Cuál es tu email?"
        validation="required|email" :validation-messages="{
          email: 'Ingresa un email en formato válido',
          required: 'Por favor ingresa un e-mail',
        }" />
      <FormKit type="password" name="password" label="Contraseña" 
      :validation="[['required'],['length',6], ['matches',/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{6,}$/]]"
        prefix-icon="password" suffix-icon="eyeClosed" @suffix-icon-click="handleEyeIconClick" :validation-messages="{
          matches: 'El password debe tener una mayúscula, una minúscula, un número y un carácter especial',
          length: 'Debes ingresar al menos 6 caracteres',
          required: 'Por favor ingresa una contraseña',
        }" placeholder="Escribe una contraseña" help="Elige un password" />
      <FormKit type="password" name="password_confirm" label="Confirma tu contraseña" placeholder="Repite tu contraseña"
        validation="required|confirm" help="Confirma tu contraseña" prefix-icon="password" suffix-icon="eyeClosed"
        @suffix-icon-click="handleEyeIconClick" :validation-messages="{
          required: 'Por favor ingresa una confirmación de contraseña',
          confirm: 'Las contraseñas no coinciden',
        }" />
      <FormKit type="submit" label="Registrar" />
    </div>
  </FormKit>
  <div v-else class="mt-5 text-success">
    <h2>Se ha registrado exitosamente!</h2>
  </div>
</template>


<script>
export default {
  name: 'RegisterUser',
  components: {
  },
  props: {
  },
  data() {
    return {
      submitted: false,
      formData:{}
    };
  },
  methods: {
    async submitHandler() {
      await new Promise((r) => setTimeout(r, 1000));
      this.submitted = true;
      console.log("formData: ", this.formData)
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