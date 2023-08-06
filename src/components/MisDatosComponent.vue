<template>
    <div class="pagina-datos container">
    <h1>Mis datos</h1>
    <section class="detalle-curso">
<pre>{{ usuario }}</pre>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import axios from 'axios';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'MisDatosComponent',
    setup() {
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        return {
            isLogin: sessionStorage.getItem("isLoggedIn"),
            usuario  
        }
    }
})

</script>