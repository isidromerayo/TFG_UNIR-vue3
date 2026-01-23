<template>
  <header id="header" data-cy="header" class="header d-flex align-items-center fixed-top color-vue-verde">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <router-link to="/home" data-cy="logo-link" class="logo d-flex fix-home-menu align-items-center">
        <img alt="Vue logo" src="@/assets/logo.svg" class="unir-logo" />
        <img src="@/assets/img/Unir_2021_logo.svg" alt="Logo UNIR" class="unir-logo" />
        <h1>TFG - FFJ: AEP</h1>
      </router-link>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" data-cy="navbar" class="navbar">
        <ul>
          <li><router-link to="/home" active-class="active">Home</router-link></li>
          <li class="dropdown"><router-link to="/categorias" active-class="active"><span>Categorias</span><i
                class="bi bi-chevron-down dropdown-indicator"></i></router-link>
            <ul>
              <template v-for="categoria in categorias" :key="categoria.id">
              <li><router-link :to="{ name: 'categoria', params: { id: categoria.id } }">{{ categoria.nombre }}</router-link>
               </li>
                </template>                  
              <li><router-link to="/categorias">...</router-link></li>
            </ul>
          </li>
          <li><router-link to="/carrito" active-class="active" title="carrito de la compra"><i class="bi bi-cart4"
                title="carito de la compra" aria-hidden="true"> carrito</i></router-link></li>
          <li><router-link to="/registro" v-if="!isLoggedIn"
              active-class="active">Registro</router-link></li>
          <li><router-link to="/acceso" v-if="!isLoggedIn" class="get-a-quote" active-class="active">Acceso</router-link>
          </li>
          <template v-if="isLoggedIn">
            <li class="dropdown">
              <router-link to="/mis-datos" active-class="active">
                <span><i class="bi bi-file-person iconos-menu"> Privado</i></span>
                <i class="bi bi-chevron-down dropdown-indicator"></i></router-link>
              <ul>
                <li><router-link to="/mis-datos" active-class="active">Mis datos</router-link></li>
                <li><router-link to="/mis-cursos" active-class="active">Mis cursos</router-link></li>
                <li><a href="#" @click="logout()">Desconectar</a></li>
              </ul>
            </li>
          </template>

        </ul>
      </nav><!-- .navbar -->
    </div>
  </header><!-- End Header -->
</template>

<script lang="ts">

import { RouterLink } from 'vue-router';
import axios from 'axios';
import { ref, defineComponent, onMounted, onUpdated } from 'vue';
import Swal from 'sweetalert2';
import { removeToken, getToken, removeUser } from '../services/session'
import { API_URL } from '../utils/constants'
import type { Categoria } from '../types/models'


export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const categorias = ref<Array<Categoria>>([])
    const isLoggedIn = ref(false);

    onMounted(() => {
      isLoggedIn.value = (getToken()) ? true : false;
      axios.get(`${API_URL}categorias?sort=nombre&size=5`).then(response => {
        categorias.value = response.data._embedded.categorias
      }).catch(error => {
        console.log(error)
      })

      
    })
    onUpdated(() =>{
      isLoggedIn.value = (getToken()) ? true : false;
    })

    const logout = () => {
      removeToken()
      removeUser()
      Swal.fire('Acceso', 'Cierre de sesion correcta');
      location.replace("/home")
    }

    return {
      categorias,
      logout,
      isLoggedIn
    }
  }
})
</script>