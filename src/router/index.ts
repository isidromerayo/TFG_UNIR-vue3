import { createRouter, createWebHistory } from 'vue-router'

import RegistroComponent from '../components/RegistroComponent.vue'
import HomeComponent from '../components/HomeComponent.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import AccesoComponent from '../components/AccesoComponent.vue'
import CarritoComponent from '../components/CarritoComponent.vue'
import CategoriasComponent from '../components/CategoriasComponent.vue'
import CategoriaComponent from '../components/CategoriaComponent.vue'
import CursoComponent from '../components/CursoComponent.vue';
import MisCursosComponent from  '../components/MisCursosComponent.vue';
import MisDatosComponent from '../components/MisDatosComponent.vue'
import BusquedaComponent from '../components/BusquedaComponent.vue'
import ValoracionComponent from '@/components/ValoracionComponent.vue'

import { getToken } from '../services/session'

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
      path: '/curso/:id',
      name: 'curso',
      component: CursoComponent
    },
    {
      path: '/valoracion/:id',
      name: 'valoracion',
      component: ValoracionComponent
    },
    {
      path: '/buscar/:search',
      name: 'busqueda',
      component: BusquedaComponent
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
      path: '/mis-cursos',
      name: 'mis-cursos',
      component: MisCursosComponent,
      beforeEnter: (to, from, next) => {
        if (getToken()) {
          next();
        } else {
          router.push("/acceso")
        }
      }
    },
    {
      path: '/mis-datos',
      name: 'mis-datos',
      component: MisDatosComponent,
      beforeEnter: (to, from, next) => {
        if (getToken()) {
          next();
        } else {
          router.push("/acceso")
        }
      }
    },    
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorComponent
    }
    
  ]
})

export default router
