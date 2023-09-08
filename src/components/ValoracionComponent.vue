<template>
    <div class="container pagina-datos">
    <h1>Opinión</h1>
    <section class="detalle_opinion">
        <div v-if="alumno" class="datos-alumno">
            {{ alumno.nombre }} {{ alumno.apellidos }}
        </div>
        <div class="info-valoracion">
            Valoración <span class="valoracion-puntos">{{valoracion.puntuacion}}/5</span> / Fecha <span class="fecha">{{ valoracion.fecha}}</span>
        </div>
        <div v-if="valoracion" class="info-comentario">
            {{ valoracion.comentario }}
        </div>
        <div v-if="curso" class="info-curso">
            Curso de <RouterLink :to="`/curso/${curso.id}`" class="">
                <span class="">{{ curso.titulo }}</span>
            </RouterLink> actualizado 
            <span class="">{{ curso.fechaActualizacion}}</span> 
            valoración media <span class="destacar-info">{{ curso.valoracionMedia }}</span>, 
            profesor/a <span v-if="curso.instructor">
                {{ curso.instructor.nombre + ' ' +  curso.instructor.apellidos  }}</span>
        </div>
    </section>
</div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { API_URL } from '../utils/constants.js'

import axios from 'axios';

export default defineComponent({
    name: 'ValoracionComponent',
    setup() {
        const alumno: any = ref({})
        let curso: any = ref({})
        let valoracion: any = ref({})

        const route:any = useRoute();

        onMounted(() => {
            const id = route.params.id;
            getValoracionPorId(id)
            getValoracionPorIdCurso(id)
            getValoracionPorIdUsuario(id)
        });

        const getValoracionPorId = (id:string)  => {
            axios.get(`${API_URL}valoraciones/${id}`).then(response => {
                valoracion.value = response.data
            }).catch(error => {
                console.log(error)
            })     
        }
        const getValoracionPorIdCurso = (id:string) => {
            axios.get(`${API_URL}valoraciones/${id}/curso`).then(response => {
                curso.value = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            }) 
        }
        const getValoracionPorIdUsuario = (id:string) => {
            axios.get(`${API_URL}valoraciones/${id}/estudiante`).then(response => {
                alumno.value = response.data
            }).catch(error => {
                console.log(error)
            }) 
        }

        return {
            alumno,
            valoracion,
            curso
        }
    }
})

</script>