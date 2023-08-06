<template>
    <div class="pagina-datos container">
    <h1>Mis cursos</h1>
    <section class="detalle-curso">

    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import axios from 'axios';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'MisCursosComponent',
    setup() {
        
        return {
            isLogin: sessionStorage.getItem("isLoggedIn"),
            usuario: sessionStorage.getItem("usuario")   
        }
    }
})

</script>