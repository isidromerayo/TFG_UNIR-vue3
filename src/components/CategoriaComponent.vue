<template>
    <div class="container pagina-datos">
        <h1>Categoria <span class="destacar-palabra">{{ categoria?.nombre }}</span>, sus cursos...</h1>
        <div>
            <template  v-for="curso in cursos" :key="curso.id">
            <section class="listado-categorias">
                <div>
                    <h2>{{ curso.titulo }}</h2>
                </div>
                <div>
                    Valoración media: {{ curso.valoracionMedia }} / precio: {{ curso.precio }}
                </div>
                <div>
                    <RouterLink :to="`/curso/${curso.id}`"><span>detalle del curso</span><i
                    class="bi bi-arrow-right"></i></RouterLink>
                </div>
            </section>
            </template>
        </div>
        <div class="sin-resultados" v-if="cursos.length < 0">
            Sin cursos en esta categoría
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '../utils/constants.js'
import { useRoute } from 'vue-router';
import {Curso} from '../model/curso'
import { Categoria } from '@/model/categoria';

export default defineComponent({
    name: "CategoriaComponent",
    watch: {
    $route(to, from) {
            this.getCategoriaId(to.params.id)
            this.getCursosCategoriaId(to.params.id)
        },
    },
    setup() {
        const categoria = ref<Categoria>()
        const cursos = ref<Array<Curso>>([])

        const { params}:{params:any} = useRoute();


        onMounted(() => {
            getCategoriaId(params.id)
            getCursosCategoriaId(params.id)
        });

        const getCategoriaId = (categoria_id:number) => {
            axios.get(`${API_URL}categorias/${categoria_id}`).then(response => {
                categoria.value = response.data
            }).catch(error => {
                console.log(error)
            })
        }

        const getCursosCategoriaId = (categoria_id:number) => {
            axios.get(`${API_URL}categorias/${categoria_id}/cursos`).then(response => {
                cursos.value = response.data._embedded.cursos
            }).catch(error => {
                console.log(error)
            })
        }

        return {
            categoria,
            cursos,
            getCursosCategoriaId,
            getCategoriaId
        }
    }
});
</script>