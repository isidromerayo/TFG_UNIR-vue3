<template>
    <div class="pagina-datos container">
    <h1>Mis cursos</h1>
    <section class="detalle-curso card">

    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { USER } from '@/utils/constants';

export default defineComponent({
    name: 'MisCursosComponent',
    setup() {
        // Nota de diseño: cuando este listado consuma /api/usuarios/{id}/cursos,
        // no hará falta leer el token aquí para la petición: el interceptor de
        // @/utils/api añade ya Authorization: Bearer <token>. La comprobación
        // local se mantiene solo para la UX de "sin sesión".
        return {
            isLogin: localStorage.getItem("isLoggedIn"),
            usuario: localStorage.getItem(USER)   
        }
    }
})

</script>