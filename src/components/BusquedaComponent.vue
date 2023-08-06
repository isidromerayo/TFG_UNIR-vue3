<template>
    <div class="container pagina-datos">
        <h1>Búsqueda de nuestros cursos: <span class="destacar-palabra">{{ query_string }}</span></h1>
        <div v-if="!cursos || cursos.length < 1" class="sin-resultados">
            No hay resultados para el texto indicado, revise o refine la palabra de búsqueda...
            <p>
                <RouterLink to="/home">volver al inicio</RouterLink>
            </p>
        </div>
        <section class="listado-categorias" v-for="curso in cursos" :key="curso.id">
            <div>

                <h2>{{ curso.titulo }}</h2>
            </div>
            <div>
                {{ curso.descripcion }}
                <RouterLink :to="`/curso/${curso.id}`" class=""><span>detalle del curso</span><i class="bi bi-arrow-right"></i></RouterLink>
            </div>
        </section>

    </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';

import { useRoute } from 'vue-router';
import axios from 'axios';


export default defineComponent({
    name: 'BusqueComponent',
    setup() {
        const route = useRoute()
        const query_string = ref(route.params.search);
        const cursos = ref()

        const buscarCursosPorTexto = (query_string: string) => {
            axios.get(`http://localhost:8080/api/cursos/search/findByTituloContaining?titulo=${query_string}`).then(response => {
                cursos.value = response.data._embedded.cursos
            })
        }
        
        onMounted(() => {
            buscarCursosPorTexto(query_string.value)
        });
        

        return {
            query_string,
            cursos
        }

    }
})
</script>