<template>
  <SliderComponent />
  <section class="featured-services portada-cards">
    <div class="container">

      <div class="row gy-4 cursos-destacados">
        <div>
          <h1>Cursos destacados</h1>
        </div>
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="curso in cursos">
          <div>
            <h4>{{ curso.titulo }}</h4>
            <p class="description">{{ curso.descripcion }}</p>
            <p class="description">valoración media: <b>{{ curso.valoracionMedia }}/5</b> / actualizado: {{
              curso.fechaActualizacion }}</p>
            <a href="#"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

      </div>

    </div>
  </section>

  <section class="featured-services portada-cards">
    <div class="container">

      <div class="row gy-4 cursos-opiniones">
        <div>
          <h1>Opiniones</h1>
        </div>
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="valoracion in opiniones">
          <div>
            <p class="description">Valoración: <b>{{ valoracion.puntuacion }}/5</b></p>
            <p class="description">{{ valoracion.comentario }}</p>
            <a href="#"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section class="featured-services portada-cards">
    <div class="container">

      <div class="row gy-4 cursos-actualizaciones">
        <div>
          <h1>Ultimas actualizaciones</h1>
        </div>
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="actualizacion in actualizaciones">
          <div>
            <p class="description">actualizado: <b>{{ actualizacion.fechaActualizacion }}</b></p>
            <h4>{{ actualizacion.titulo }} </h4>
            <p class="description">{{ actualizacion.descripcion }}</p>
            <a href="#"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">

import SliderComponent from './SliderComponent.vue'
import axios from 'axios';

export default {
  name: "HomeComponent",
  components: { SliderComponent },
  data() {
    return ({
      cursos: [],
      opiniones: [],
      actualizaciones: []
    })
  },
  mounted() {
    axios.get("http://localhost:8080/api/cursos/search/selectMorePoints").then(response => {
      this.cursos = response.data._embedded.cursos
    }).catch(error => {
      console.log(error)
    })
    axios.get("http://localhost:8080/api/valoraciones/search/selectLastOpinions").then(response => {
      this.opiniones = response.data._embedded.valoraciones
    }).catch(error => {
      console.log(error)
    })
    axios.get("http://localhost:8080/api/cursos/search/selectLastUpdates").then(response => {
      this.actualizaciones = response.data._embedded.cursos;
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
