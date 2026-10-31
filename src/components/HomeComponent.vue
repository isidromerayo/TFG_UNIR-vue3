<template>
  <SliderComponent />
  <section class="featured-services portada-cards">
    <div class="container">

      <div class="row gy-4 cursos-destacados">
        <div>
          <h1>Cursos destacados</h1>
        </div>
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="curso in cursos" :key="curso.id">
          <div>
            <h4>{{ curso.titulo }}</h4>
            <p class="description">{{ curso.descripcion }}</p>
            <p class="description">valoración media: <b>{{ curso.valoracionMedia }}/5</b> / actualizado: {{
              curso.fechaActualizacion }}</p>
              <RouterLink :to="`/curso/${curso.id}`"><span>Detalle</span><i
                    class="bi bi-arrow-right"></i></RouterLink>
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
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="valoracion in opiniones" :key="valoracion.id">
          <div>
            <p class="description">Valoración: <b>{{ valoracion.puntuacion }}/5</b></p>
            <p class="description">{{ valoracion.comentario }}</p>
            <RouterLink :to="`/valoracion/${valoracion.id}`"><span>Detalle</span><i class="bi bi-arrow-right"></i></RouterLink>
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
        <div class="col-lg-4 col-md-6 service-item d-flex" v-for="actualizacion in actualizaciones" :key="actualizacion.id">
          <div>
            <p class="description">actualizado: <b>{{ actualizacion.fechaActualizacion }}</b></p>
            <h4>{{ actualizacion.titulo }} </h4>
            <p class="description">{{ actualizacion.descripcion }}</p>
            <RouterLink :to="`/curso/${actualizacion.id}`"><span>Detalle</span><i
                    class="bi bi-arrow-right"></i></RouterLink>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">

import SliderComponent from './SliderComponent.vue'
import api from '../utils/api';
import type { Actualizacion, Curso } from '../types/models'

export default {
  name: "HomeComponent",
  components: { SliderComponent },
  data() {
    return ({
      cursos: [] as Curso[],
      opiniones: [] as any[],
      actualizaciones: [] as Curso[]
    })
  },
  mounted() {
    const actualizaciones: Actualizacion[] = []
    const url_cursos = `cursos/search/selectMorePoints`;
    api.get(url_cursos).then(response => {
      this.cursos = response.data._embedded.cursos
    }).catch(error => {
      console.log(error)
    })
    const url_valoraciones = `valoraciones/search/selectLastOpinions`;

    api.get(url_valoraciones).then(response => {
      this.opiniones = response.data._embedded.valoraciones
    }).catch(error => {
      console.log(error)
    })
    const url_actualizaciones = `cursos/search/selectLastUpdates`;

    api.get(url_actualizaciones).then(response => {
      this.actualizaciones = response.data._embedded.cursos;
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
