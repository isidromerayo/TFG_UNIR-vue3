import { createRouter, createWebHistory } from 'vue-router'

import RegistroComponent from '../components/RegistroComponent.vue'
import HomeComponent from '../components/HomeComponent.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import AccesoComponent from '../components/AccesoComponent.vue'
import CarritoComponent from '../components/CarritoComponent.vue'
import CategoriasComponent from '../components/CategoriasComponent.vue'
import CategoriaComponent from '../components/CategoriaComponent.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriasComponent
    },
    {
      path: '/categoria/:id',
      name: 'categoria',
      component: CategoriaComponent
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroComponent
    },
    {
      path: '/acceso',
      name: 'acceso',
      component: AccesoComponent
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoComponent
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorComponent
    }
    
  ]
})

export default router
