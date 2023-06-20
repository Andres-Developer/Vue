<template>
  <div class="container mt-3 d-flex gap-5 justify-content-between">
    <StudentRegistration @register-student="registerStudentHandlerSubmit" />
    <StudentsTable :students="students" />
  </div>
</template>

<script>
import StudentRegistration from './components/StudentRegistration.vue';
import StudentsTable from './components/StudentsTable.vue';

export default {
  name: 'App',
  components: {
    StudentRegistration,
    StudentsTable
  },
  data() {
    return {
      students: [],
    };
  },
  methods: {
    registerStudentHandlerSubmit(student) {
      this.students.push({ ...student, id: this.students.length + 1 });
    },

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
