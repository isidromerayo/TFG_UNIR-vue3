<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
        <!--
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterView />
        -->
        <header id="header" class="header d-flex align-items-center fixed-top color-angular-rojo">
  <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

    <a href="index.html" class="logo d-flex align-items-center">
      <!-- Uncomment the line below if you also wish to use an image logo -->
      <img src="@/assets/img/Unir_2021_logo.svg" alt="Logo UNIR" class="unir-logo" />
      <h1>TFG - FFJ: AEP</h1>
    </a>

    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    <nav id="navbar" class="navbar">
      <ul>
        <li><a href="index.html" class="active">Home</a></li>
        <li class="dropdown"><a href="#"><span>Categorias</span><i class="bi bi-chevron-down dropdown-indicator"></i></a>
          <ul>
            <li><a href="#">Cat 1</a></li>
            <li><a href="#">Cat 2</a></li>
            <li><a href="#">Cat 3</a></li>
            <li><a href="#">Cat 4</a></li>
          </ul>
        </li>
        <li><a href="#" title="carrito de la compra"><i class="bi bi-cart4" title="carito de la compra" aria-hidden="true"> carrito</i></a></li>
        <li><a href="#">Registro</a></li>
        <li><a href="#" class="get-a-quote">Acceso</a></li>

      </ul>
    </nav><!-- .navbar -->

  </div>
</header><!-- End Header -->

<!-- ======= Hero Section ======= -->
<section id="hero" class="hero d-flex align-items-center">
  <div class="container">
    <div class="row gy-4 d-flex justify-content-between">
      <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
        <!-- 
        <h2 data-aos="fade-up">Encuentra tu curso</h2>
        <p data-aos="fade-up" data-aos-delay="100">Facere distinctio molestiae nisi fugit tenetur repellat non praesentium nesciunt optio quis sit odio nemo quisquam. eius quos reiciendis eum vel eum voluptatem eum maiores eaque id optio ullam occaecati odio est possimus vel reprehenderit</p>
        -->
        <h2>Encuentra tu curso</h2>
        <p>Facere distinctio molestiae nisi fugit tenetur repellat non praesentium nesciunt optio quis sit odio nemo
          quisquam. eius quos reiciendis eum vel eum voluptatem eum maiores eaque id optio ullam occaecati odio est
          possimus vel reprehenderit</p>
        <form action="#" class="form-search d-flex align-items-stretch mb-3">
          <!--<form action="#" class="form-search d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="200">-->
          <input type="text" class="form-control" placeholder="nombre del curso" aria-label="buscador de cursos" />
          <button type="submit" class="btn btn-primary">Search</button>
        </form>

        <div class="row gy-4">
          <!-- <div class="row gy-4" data-aos="fade-up" data-aos-delay="400">-->



        </div>
      </div>

      <div class="col-lg-5 order-1 order-lg-2 hero-img">
        <!-- <div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out"> -->
        <img src="@/assets/img/hero-img.svg" class="img-fluid mb-3 mb-lg-0" alt="">
      </div>

    </div>
  </div>
</section><!-- End Hero Section -->

<main id="main">

  <!-- ======= Featured Services Section ======= -->
  <section class="featured-services">
    <div class="container">
      
      <div class="row gy-4 cursos-destacados">
        <div>
          <h1>Cursos destacados</h1>
        </div>
        <div class="col-lg-4 col-md-6 service-item d-flex">
          <!-- <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up"> -->
          <div>
            <h4 class="title">Lorem Ipsum</h4>
            <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!--<div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">-->
       <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Dolor Sitema</h4>
            <p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Sed ut perspiciatis</h4>
            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
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
          <!-- <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up"> -->
          <div>
            <h4 class="title">Voluptatum deleniti atque </h4>
            <p class="description">Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!--<div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">-->
       <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Minim veniam</h4>
            <p class="description">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Perspiciatis</h4>
            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
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
          <!-- <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up"> -->
          <div>
            <h4 class="title">Voluptatum deleniti atque </h4>
            <p class="description">Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!--<div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">-->
       <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Minim veniam</h4>
            <p class="description">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 service-item d-flex">
          <div>
            <h4 class="title">Perspiciatis</h4>
            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
            <a href="#" class="readmore stretched-link"><span>Detalle</span><i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

</main><!-- End #main -->


<!-- ======= Footer ======= -->
<footer id="footer" class="footer">

  <div class="container">

    <div class="container mt-4">
      <div class="copyright">
        &copy; Copyright <strong><span>UNIR TFG - Frameworks frontend JavaScript: Análisis y estudio
            práctico</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </div>

</footer><!-- End Footer -->



</template>

<style>

</style>

<!--
<script src="@assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="@assets/js/main.js"></script>
-->