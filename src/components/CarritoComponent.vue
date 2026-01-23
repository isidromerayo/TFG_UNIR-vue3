<template>
  <div class="container pagina-datos">
    <h1>Carrito de la compra</h1>
    <section class="detalle-curso">
      <div v-if="carrito.length === 0" class="sin-resultados">
        No hay productos en el carrito
      </div>
      <div v-if="carrito.length !== 0">
        <h2>Cursos a comprar</h2>
        <ul>
          <li v-for="item in carrito" class="curso-carrito" :key="item.curso.id">{{ item.curso.titulo }} - {{ item.precio }} <button class="btn btn-warning borrar-curso-carrito"
              @click="borrarProducto(item)">borrar</button>
          </li>
        </ul>
        <div class="total-carrito">Total: <span class="destacar-info">{{ totalCompra }}</span></div>
        <div class="boton-comprar">
          <button class="btn btn-primary" @click="comprar">comprar</button>

        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppStore } from '../stores/app';
import Swal from 'sweetalert2';
import { getToken } from '../services/session'
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'CarritoComponent',

  setup() {
    const store = useAppStore()

    const carrito = computed(() => store.carrito)
    const totalCompra = computed(() => store.totalCarrito)

    const router = useRouter();

    const comprar = () => {

      if (!getToken()) {
        Swal.fire({ title: 'Debe tener iniciada sesión para comprar' })
        router.push("/acceso");
      }
      else {
        Swal.fire({
          title: '¿Estas seguro de realizar la compra?',
          text: "No se puede deshacer",
          showCancelButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("inicio de transacción de compra")
            store.cleanCarrito()
            router.push("/mis-cursos");
            Swal.fire('Compra','Procesada la compra correctamente');
          }
        }).catch((error) => {
          console.log(error)
        });
      }
    }
    const borrarProducto = (item:any) => {
      store.removeCursoCarrito(item)
    }

    return {
      carrito,
      comprar,
      borrarProducto,
      totalCompra
    }
  }

})

</script>