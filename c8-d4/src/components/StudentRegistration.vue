<template>
  <div>
    <h2 class="">Registro de nuevo estudiante</h2>
    <FormKit type="form" id="student-registration" submit-label="Register" @submit="submitHandler" @click="cleanSuccessSubmitMessage" :actions="false"
      v-model="formData" incomplete-message="Por favor completa todos los campos" :classes="{ form: '$reset mt-4' }">
      <div class="outer-container-form">
        <div class="h6 mb-3">Diligencia el siguiente formulario para registrar un nuevo estudiante</div>
        <div class="success" v-if="submitted">¡Registro exitoso!</div>
        <FormKit type="text" name="name" label="Nombre" placeholder="Ingresa tu nombre"
          help="¿Cómo quieres que te llamemos?" validation="required|length:3" :validation-messages="{
            length: 'Debes ingresar al menos 3 caracteres',
            required: 'Por favor ingresa un nombre',
          }" />
        <FormKit type="text" name="email" label="e-mail" placeholder="usuario@email.com" help="¿Cuál es tu email?"
          validation="required|email" validation-visibility="dirty" :validation-messages="{
            email: 'Ingresa un email en formato válido',
            required: 'Por favor ingresa un e-mail',
          }" />
        <FormKit type="radio" name="gender" label="Género" help="Selecciona el género con el que te identificas"
          validation="required" :validation-messages="{
            required: 'Por favor selecciona alguna de las opciones',
          }" :options="{
  male: 'Masculino',
  female: 'Femenino',
  non_binary: 'No binario',
  non_answer: 'Prefiero no decirlo'
}" />
        <FormKit type="checkbox" name="courses" label="Cursos" decorator-icon="check" validation="required|min:2" :validation-messages="{
          required: 'Los cursos son requeridos',
          min: 'Debes seleccionar al menos 2 cursos',
        }" validation-visibility="dirty" :options="{
  vue: 'Vue',
  angular: 'Angular',
  react: 'React',
  next: 'Next.js',
}" help="Selecciona míminmo 2 cursos." />
        <div class="d-flex mt-4 justify-content-evenly align-items-end">
          <FormKit type="submit" label="Registrar" :classes="{ outer: '$reset' }" />
          <div>
            <b-button @click="resetForm">Limpiar</b-button>
          </div>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script>

export default {
  name: 'StudentRegistration',
  emits: ['register-student'],
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
      this.$emit('register-student', this.formData);
      this.resetForm();
    },
    handleEyeIconClick(node) {
      node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
      node.props.type = node.props.type === 'password' ? 'text' : 'password';
    },
    resetForm() {
      this.$formkit.reset('student-registration');
    },
    cleanSuccessSubmitMessage() {
      this.submitted = false;
    }
  },
  computed: {
  },

};
</script>

<style>
.my-wrapper,
.my-fieldset {
  --fk-max-width-input: none;
}

.outer-container-form {
  width: 450px;
  height: auto;
  border: 1px solid #e4e4e4;

  padding: 1.5em;
  border-radius: 1em;
  margin: 0 auto 1em auto;
}

.my-label,
.my-help {
  text-align: start;
}

.my-legend {
  text-align: start;
  width: 60px;
}

.success {
  padding: 0.75em;
  border-radius: 0.5em;
  background-color: lightgreen;
  margin: 1em 0;
}
</style>
