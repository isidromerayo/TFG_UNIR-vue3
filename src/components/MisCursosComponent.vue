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
import { USER } from '@/utils/constants';

export default defineComponent({
    name: 'MisCursosComponent',
    setup() {
        
        return {
            isLogin: localStorage.getItem("isLoggedIn"),
            usuario: localStorage.getItem(USER)   
        }
    }
})

</script>