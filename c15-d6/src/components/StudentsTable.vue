<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const module = 'studentsModule';
const getStudentsFromAPI = () => store.dispatch(`${module}/getStudentsFromAPI`);
const students = computed(() => store.getters[`${module}/getStudents`]);
const loading = computed(() => store.getters[`${module}/getLoadingStatus`]);

getStudentsFromAPI();

const getSpanishGenders = (gender) => {
  if (gender === "male") {
    return 'Masculino';
  }
  if (gender === "female") {
    return 'Femenino';
  }
  if (gender === "non_binary") {
    return 'No binario';
  }
  return 'Prefiere no decirlo';
};
const capitalizeWord = (word) => {
  return (word && word[0].toUpperCase() + word.slice(1)) || "";
};

</script>

<template>
  <div>
    <h2 class="">Estudiantes registrados</h2>
    <div class="outer-container-table mt-4">
      <b-table-simple v-if="!loading" responsive class="container table-width">
        <b-thead>
          <b-tr variant="light">
            <b-th>Id</b-th>
            <b-th>Nombre</b-th>
            <b-th>E-mail</b-th>
            <b-th>Género</b-th>
            <b-th>Cursos inscritos</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="student in students" :key="student.id" class="align-middle">
            <b-td sticky-column> {{ student.id }}</b-td>
            <b-td> {{ capitalizeWord(student.name) }} </b-td>
            <b-td> {{ student.email }}</b-td>
            <b-td> {{ getSpanishGenders(student.gender) }}</b-td>
            <b-td>
              <span v-for="course, index in student.courses" :key="index">{{ capitalizeWord(course) }}, </span>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr variant="light">
            <b-th></b-th>
            <b-th colspan="2" class="text-end">Total alumnos: {{ students.length }}</b-th>
            <b-th></b-th>
            <b-th></b-th>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
      <div v-else class="d-flex justify-content-center align-items-center">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>



<style scoped>
.outer-container-table {
  width: 950px;
  height: auto;
  border: 1px solid #e4e4e4;

  padding: 1.5em;
  border-radius: 1em;
  margin: 0 auto 1em auto;
}
</style>
