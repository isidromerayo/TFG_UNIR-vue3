<template>
    <SliderComponent/>
        <section class="featured-services">
      <div class="container">

        <div class="row gy-4 cursos-destacados">
          <div>
            <h1>Cursos destacados</h1>
          </div>
          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Lorem Ipsum</h4>
              <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                occaecati cupiditate non provident</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Dolor Sitema</h4>
              <p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat tarad limino ata</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Sed ut perspiciatis</h4>
              <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section class="featured-services">
      <div class="container">

        <div class="row gy-4 cursos-opiniones">
          <div>
            <h1>Opiniones</h1>
          </div>
          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Voluptatum deleniti atque </h4>
              <p class="description">Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Minim veniam</h4>
              <p class="description">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                tarad limino ata</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Perspiciatis</h4>
              <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="featured-services">
      <div class="container">

        <div class="row gy-4 cursos-actualizaciones">
          <div>
            <h1>Ultimas actualizaciones</h1>
          </div>
          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Voluptatum deleniti atque </h4>
              <p class="description">Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Minim veniam</h4>
              <p class="description">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                tarad limino ata</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 service-item d-flex">
            <div>
              <h4 class="title">Perspiciatis</h4>
              <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur</p>
              <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script lang="ts">

import SliderComponent from './SliderComponent.vue'

export default {
    name: "HomeComponent",
    components: {SliderComponent},
    methods: {
    }
}
</script>
