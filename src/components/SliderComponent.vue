<template>

    <section id="hero" class="hero d-flex align-items-center">
    <div class="container">
      <div class="row gy-4 d-flex justify-content-between">
        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h2>Encuentra tu curso</h2>
          <p>Facere distinctio molestiae nisi fugit tenetur repellat non praesentium nesciunt optio quis sit odio nemo
            quisquam. eius quos reiciendis eum vel eum voluptatem eum maiores eaque id optio ullam occaecati odio est
            possimus vel reprehenderit</p>
          <form action="#" class="form-search d-flex align-items-stretch mb-3">
            <input type="text" class="form-control" placeholder="nombre del curso" aria-label="buscador de cursos" />
            <button type="submit" class="btn btn-primary">Buscar</button>
          </form>

          <div class="row gy-4">



          </div>
        </div>

        <div class="col-lg-5 order-1 order-lg-2 hero-img">
          <img src="@/assets/img/hero-img.svg" class="img-fluid mb-3 mb-lg-0" alt="">
        </div>

      </div>
    </div>
  </section><!-- End Hero Section -->

</template>

<script lang="ts">

export default {
    name: "SliderComponent",
    methods: {
    }
}
</script>