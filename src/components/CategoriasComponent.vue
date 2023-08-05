<template>
    <div class="container pagina-datos">
    <h1>Categorias de nuestros cursos</h1>
        <section class="listado-categorias" v-for="categoria in categorias" :key="categoria.id" >
            <div>
            <h2>{{ categoria.nombre}}</h2>
            </div>
            <div>
                {{ categoria.descripcion }}
                <RouterLink :to="`/categoria/${categoria.id}`"><span>ver cursos</span><i
                    class="bi bi-arrow-right"></i></RouterLink>
            </div>
        </section>
   
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'CategoriasComponent',
    data() {
    return ({
      categorias: []
    })
  },
  mounted() {
    axios.get("http://localhost:8080/api/categorias?sort=nombre").then(response => {
                this.categorias = response.data._embedded.categorias
            }).catch(error => {
                console.log(error)
            })
  }


})
</script>