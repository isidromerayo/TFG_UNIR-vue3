<template>
    <div class="container pagina-datos">
        <h1>{{ curso?.titulo }}</h1>
        <section class="detalle-curso">
            <p>{{ curso?.descripcion }}</p>
            <p class="description">Valoración: <b>{{ curso?.valoracionMedia }}/5</b></p>
            <p class="description">Precio {{ curso?.precio }} </p>
            <p class="descripcion">Creado: {{ curso?.fechaCreacion }}/ actualizado: {{ curso?.fechaActualizacion }}</p>
            <p v-if="curso?.instructor" class="info-instructor">Instructor: {{ curso.instructor.nombre }} {{
                curso.instructor.apellidos }} <i>"{{ curso.instructor.descripcion }}"</i></p>
            <p><button v-if="curso" type="button" class="btn btn-primary borrar-form" @click="addCursoCarritoEvent(curso); mensajeOk()">Comprar
                    curso</button></p>

        </section>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../utils/constants'
import { useAppStore } from '../stores/app'
import type { Curso } from '../types/models'

export default defineComponent({
    name: "CursoComponent",
    props: ["carrito"],
    setup() {
        const route = useRoute()
        const curso_id = route.params['id'] as string;
        const curso = ref<Curso | null>(null);
        
        const store = useAppStore()
        
        onMounted(() => {
            getCursosId(curso_id);

        });

        const getCursosId = (curso_id: string) => {
            axios.get(`${API_URL}cursos/${curso_id}`).then(response => {
                curso.value = response.data
            }).catch(error => {
                console.log(error)
            })
        }
        const mensajeOk = () => {
            Swal.fire({ title: 'Curso añadido al carrito' })
        }

        const addCursoCarritoEvent = (curso:Curso) => {
            store.addCursoCarrito({ curso: curso, precio: curso.precio || 0 })
        }
        return {
            curso,
            mensajeOk,
            addCursoCarritoEvent,
        }
    }

})
</script>