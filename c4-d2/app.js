const { createApp } = Vue;

// Componente
const CustomTable = {
  props: {
     colorTabla: String,
     lista: Array,
  },
  template: /*html*/`  
      <table class="table table-striped" :class="colorTabla">      
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Artículo</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(elemento, index) in lista" :key="elemento.id">
            <th scope="row">{{elemento.id}}</th>
            <td>{{elemento.articulo}}</td>
            <td>$\{{elemento.precio}}</td>
          </tr>
        </tbody>
      </table>
`};

createApp({
  components: {
    'table-component': CustomTable
  },
  data() {
    return {
      colores:["table-primary", "table-danger", "table-success"],
      partesPC: [
        {
          id: 1,
          articulo: "Mouse Gamer",
          precio: 150.00,
        },
        {
          id: 2,
          articulo: "Monitor 27 inch",
          precio: 800.00,
        },
        {
          id: 3,
          articulo: "Teclado Mecánico",
          precio: 400.00,
        },
      ],
      elementosOficina: [
        {
          id: 1,
          articulo: "Tijeras",
          precio: 14.00,
        },
        {
          id: 2,
          articulo: "Calculadora",
          precio: 22.00,
        },
        {
          id: 3,
          articulo: "Juego Bolígrafos",
          precio: 10.00,
        },
      ],
      equipoCocina: [
        {
          id: 1,
          articulo: "Estufa a Gas",
          precio: 1500.00,
        },
        {
          id: 2,
          articulo: "Microondas",
          precio: 400.00,
        },
        {
          id: 3,
          articulo: "Horno",
          precio: 950.00,
        },
      ],
    };
  },
  methods: {
  },
}).mount('#app');