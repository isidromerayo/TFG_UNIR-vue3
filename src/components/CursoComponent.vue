<template>
    <div class="container pagina-datos">
    <h1>{{ curso.titulo }}</h1>
    <section class="detalle-curso">
            <p>{{ curso.descripcion }}</p>
            <p class="description">Valoración: <b>{{ curso.valoracionMedia }}/5</b></p> 
            <p class="description">Precio {{curso.precio}} </p>
            <p class="descripcion">Creado: {{ curso.fechaCreacion }}/ actualizado: {{ curso.fechaActualizacion }}</p>
            <p v-if="curso.instructor" class="info-instructor">Instructor: {{ curso.instructor.nombre }} {{ curso.instructor.apellidos }} <i>"{{ curso.instructor.descripcion}}"</i></p>
            <p><button type="button" class="btn btn-primary borrar-form">Comprar curso</button></p>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: "CursoComponent",
    mounted() {
        var curso_id = this.$route.params.id;
        var curso = this.getCursosId(curso_id)

    },
    data() {
        return ({
            curso: []
        })
    },
    methods: {
        getCursosId(curso_id) {
            axios.get(`http://localhost:8080/api/cursos/${curso_id}`).then(response => {
                this.curso = response.data
            }).catch(error => {
                console.log(error)
            })
        }
    }

})
</script>