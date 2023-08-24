<template>
    <div class="pagina-datos container">
    <h1>Mis datos</h1>
    <section class="detalle-curso">
        <p>{{ usuario.fullname }}</p>
        <p>{{ usuario.username }}</p>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getUser } from '../services/session.ts'

export default defineComponent({
    name: 'MisDatosComponent',
    setup() {
        const usuario = ref({})
        usuario.value = JSON.parse(getUser());
        return {
            usuario  
        }
    }
})

</script>