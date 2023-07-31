<template>

    <div class="container pagina-datos">
        <h1>Categoria <span class="destacar-palabra">{{categoria.nombre}}</span>, sus cursos...</h1>
        
    </div>

</template>

<script lang="ts">


export default {
    name: "CategoriaComponent",
    mounted() {
        this.categoria_id = this.$route.params.id
    },
    data() {
        return {
            categoria_id: null,
            categoria: {"nombre":"test"},
            cursos: {}
        }
    },
}
</script>