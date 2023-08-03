<template>
    <div class="container pagina-datos">
        <h1>Categoria <span class="destacar-palabra">{{ categoria.nombre }}</span>, sus cursos...</h1>
        <div>
            <section class="listado-categorias" v-for="curso in cursos" :key="curso.id">
                <div>
                    <h2>{{ curso.titulo }}</h2>
                </div>
                <div>
                    Valoración media: {{ curso.valoracionMedia }} / precio: {{ curso.precio }}
                </div>
                <div>
                    <RouterLink :to="`/curso/${curso.id}`"><span>ver cursos</span><i
                    class="bi bi-arrow-right"></i></RouterLink>
                </div>
            </section>

        </div>
        <div class="sin-resultados" v-if="cursos.length < 0">
            Sin cursos en esta categoría
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: "CategoriaComponent",
    mounted() {
        var categoria_id = this.$route.params.id;
        var categoria = this.getCategoriaId(categoria_id);
        var cursos = this.getCursosCategoriaId(categoria_id)

    },
    data() {
        return ({
            categoria_id: null,
            categoria: [],
            cursos: []
        })
    },
    methods: {
        getCategoriaId(categoria_id) {
            axios.get(`http://localhost:8080/api/categorias/${categoria_id}`).then(response => {
                this.categoria = response.data
            }).catch(error => {
                console.log(error)
            })
        },
        getCursosCategoriaId(categoria_id) {
            axios.get(`http://localhost:8080/api/categorias/${categoria_id}/cursos`).then(response => {
                this.cursos = response.data._embedded.cursos
                console.log(this.cursos)
            }).catch(error => {
                console.log(error)
            })
        }
    }

})
</script>