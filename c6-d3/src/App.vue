<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
    <div class="container d-flex justify-content-center vh-100 align-items-center">
      <!-- 
        Componente "custom-table
        props: 
        
            color-tabla:  un array "colores", donde las posiciones son:
                          0: table-primary (azul)
                          1: table-primary (rojo)
                          2: table-primary (verde)

            lista: un array de varios elementos a mostrar en la tabla (partesPC, elementosOficina, equipoCocina)
       -->
      <div style="width: 300px;">
        <h1>Desafío 3</h1>
        <div class="h3 mb-5">Andrés Burbano</div>

        <div class="h5 text-primary">Partes de PC:</div>
        <custom-table :color-tabla="colores[0]" :lista="partesPC">
        </custom-table>
        <div class="h5 text-primary">Elementos de Oficina:</div>
        <custom-table :color-tabla="colores[1]" :lista="elementosOficina">
        </custom-table>
        <div class="h5 text-primary"> Equipo de Cocina:</div>
        <custom-table :color-tabla="colores[2]" :lista="equipoCocina">
        </custom-table>
      </div>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta';
import CustomTable from './components/CustomTable.vue';

export default {
  name: 'App',
  setup() {
    useMeta({
      title: 'Desafío 3',
      htmlAttrs: { lang: 'es', amp: true },
    });
  },
  components: {
    CustomTable
  },
  data() {
    return {
      colores: ["table-primary", "table-danger", "table-success"],
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
};
</script>

<style></style>
