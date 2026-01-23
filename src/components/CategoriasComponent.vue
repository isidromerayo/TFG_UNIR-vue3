<template>
  <div class="container pagina-datos">
    <h1>Categorias de nuestros cursos</h1>
    <section class="listado-categorias" v-for="categoria in categorias" :key="categoria.id">
      <div>
        <h2>{{ categoria.nombre }}</h2>
      </div>
      <div>
        {{ categoria.descripcion }}
        <RouterLink :to="`/categoria/${categoria.id}`"><span>ver cursos</span><i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '../utils/constants.js'
import type { Categoria } from '../types/models';


export default defineComponent({
  name: 'CategoriasComponent',
  setup() {
    const categorias = ref<Array<Categoria>>([]);

    onMounted(() => {
      getCategoriasOrdenadasNombre()
    });

    const getCategoriasOrdenadasNombre = () => {
      axios.get(`${API_URL}categorias?sort=nombre`).then(response => {
        categorias.value = response.data._embedded.categorias
      }).catch(error => {
        console.log(error)
      })
    }

    return {
      categorias
    }
  },

})
</script>