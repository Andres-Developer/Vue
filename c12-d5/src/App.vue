<template>
  <div class="container mt-3 d-flex gap-5 justify-content-between">
    <StudentRegistration />
    <StudentsTable />
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
    };
  },
  methods: {
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
