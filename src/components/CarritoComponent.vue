<template>
  <div class="container pagina-datos">
    <h1>Carrito de la compra</h1>
    <section class="detalle-curso">
      <div v-if="carrito.length === 0" class="sin-resultados">
        No hay productos en el carrito
      </div>
      <div v-if="carrito.length !== 0">
        <h2>Cursos a comprar</h2>
        <ul v-for="item in carrito">
          <li>{{ item.titulo }} - {{ item.precio }} <button class="btn btn-warning borrar-curso-carrito" @click="borrarProducto(item)">borrar</button>
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
import { defineComponent, onMounted, computed } from 'vue';
import { useStore, mapGetters } from 'vuex';
import Swal from 'sweetalert2';


export default defineComponent({
  name: 'CarritoComponent',

  setup() {
    const store = useStore()
    
    const carrito = computed(() => store.state.carrito)
    const totalCompra = computed(() => store.state.totalCarrito)
    const comprar = () => {
      
      Swal.fire({
              title: '¿Estas seguro de realizar la compra?',
              text: "No se puede deshacer",
              type: 'warning',
              showCancelButton: true
            }).then((result) => {
               if(result.isConfirmed) {
                console.log("inicio de transacción de compra")
                store.dispatch("cleanCarrito")
               }
               else {
                 console.log("cancelamos la compra, seguimos con el carrito")
               }
            }).catch((error)=>{
              console.log(error)
            });
    }
    const borrarProducto = (item) => {
        store.dispatch("removeCursoCarrito",item)
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