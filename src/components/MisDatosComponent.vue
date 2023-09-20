<template>
    <div class="pagina-datos container">
    <h1>Mis datos</h1>
    <section class="detalle-curso card">
        <div class="perfil-datos">Nombre y apellidos</div>
        <div>{{ usuario.fullname }}</div>
        <div class="perfil-datos">Correo electrónico</div>
        <div>{{ usuario.username }}</div>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getUser } from '../services/session'

export default defineComponent({
    name: 'MisDatosComponent',
    setup() {
        const usuario = ref({fullname:'',username:''})
        usuario.value = JSON.parse(getUser());
        return {
            usuario  
        }
    }
})

</script>