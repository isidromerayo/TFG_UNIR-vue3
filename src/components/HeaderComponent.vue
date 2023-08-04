<template>

<header id="header" class="header d-flex align-items-center fixed-top color-vue-verde">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <router-link to="/home" class="logo d-flex fix-home-menu align-items-center">
        <img alt="Vue logo" src="@/assets/logo.svg" class="unir-logo"/>
        <img src="@/assets/img/Unir_2021_logo.svg" alt="Logo UNIR" class="unir-logo" />
        <h1>TFG - FFJ: AEP</h1>
      </router-link>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/home" active-class="active">Home</router-link></li>
          <li class="dropdown"><router-link to="/categorias" active-class="active"><span>Categorias</span><i
                class="bi bi-chevron-down dropdown-indicator"></i></router-link>
            <ul>
              <li v-for="categoria in categorias" :key="categoria"><router-link :to="{ name: 'categoria', params: {id: categoria.id}}">{{ categoria.nombre }}</router-link></li>
              <li><router-link to="/categorias">...</router-link></li>
            </ul>
          </li>
          <li><router-link to="/carrito" active-class="active" title="carrito de la compra"><i class="bi bi-cart4" title="carito de la compra"
                aria-hidden="true"> carrito</i></router-link></li>
          <li><router-link to="/registro" active-class="active">Registro</router-link></li>
          <li><router-link to="/acceso"  class="get-a-quote" active-class="active">Acceso</router-link></li>

        </ul>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

</template>

<script lang="ts">

import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
  name: "HeaderComponent",
  data() {
    return ({
      categorias: []
    })
  },
  mounted() {
    axios.get(`http://localhost:8080/api/categorias?sort=nombre&size=5`).then(response => {
      this.categorias = response.data._embedded.categorias
    }).catch(error => {
      console.log(error)
    })
  }
}

</script>