<template>
    <div class="pagina-datos container">
    <h1>Mis datos</h1>
    <section class="detalle-curso">
<pre>{{ usuario }}</pre>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getUser } from '../services/session.ts'

export default defineComponent({
    name: 'MisDatosComponent',
    setup() {
        const usuario = JSON.parse(getUser());
        return {
            usuario  
        }
    }
})

</script>