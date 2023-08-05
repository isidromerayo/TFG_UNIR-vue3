<template>
    <div class="container pagina-datos">
    <h1>{{ curso.titulo }}</h1>
    <section class="detalle-curso">
            <p>{{ curso.descripcion }}</p>
            <p class="description">Valoración: <b>{{ curso.valoracionMedia }}/5</b></p> 
            <p class="description">Precio {{curso.precio}} </p>
            <p class="descripcion">Creado: {{ curso.fechaCreacion }}/ actualizado: {{ curso.fechaActualizacion }}</p>
            <p v-if="curso.instructor" class="info-instructor">Instructor: {{ curso.instructor.nombre }} {{ curso.instructor.apellidos }} <i>"{{ curso.instructor.descripcion}}"</i></p>
            <p><button type="button" class="btn btn-primary borrar-form" @click="addCursoCarrito(curso);mensajeOk()">Comprar curso</button></p>
            
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import axios from 'axios';
import {mapActions} from 'vuex';
import Swal from 'sweetalert2';

export default defineComponent({
    name: "CursoComponent",
    props: ["carrito"],
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
        ...mapActions(["addCursoCarrito"]),
        getCursosId(curso_id) {
            axios.get(`http://localhost:8080/api/cursos/${curso_id}`).then(response => {
                this.curso = response.data
            }).catch(error => {
                console.log(error)
            })
        },
        mensajeOk() {
            Swal.fire({ title: 'Curso añadido al carrito'} )
        }
    }

})
</script>