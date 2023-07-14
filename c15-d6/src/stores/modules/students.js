const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

const studentsModule = {
  namespaced: true,
  state: {
    students: [],
    loading: false,
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async getStudentsFromAPI({ commit }) {
      commit('setLoading', true);
      const response = await axios.get(BASE_URL + '/students');
      commit('setStudents', response.data);
      commit('setLoading', false);
    },
    async registerStudentToAPI({ commit }, student) {
      commit('setLoading', true);
      await axios.post(BASE_URL + '/students', student);
      commit('setLoading', false);
    }
  },
  getters: {
    getStudents: state => state.students,
    getLoadingStatus: state => state.loading,
  }
};

export { studentsModule };