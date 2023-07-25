<template>

<div class="container pagina-datos">

    <div class="col-lg-8">
        <form action="" class="signup-form">
            <h1 class="title">Registro de usuario</h1>
            <div class="row">

                <div class="col-md-6 form-group">
                    <label for="" class="label">Nombre</label>
                    <input type="text" class="form-control" placeholder="indique su nombre"
                        aria-label="indique su nombre" />

                </div>

                <div class="col-md-8 form-group">
                    <label for="" class="label">Apellidos</label>
                    <input type="text" class="form-control" placeholder="indique sus apellidos"
                        aria-label="indique sus apellidos">

                </div>
                <div class="col-md-8 form-group">
                    <label for="" class="label">Correo electrónico</label>
                    <input type="text" class="form-control" placeholder="indique su correo electrónico"
                        aria-label="indique su correo electrónico" />
                </div>


                <div class="col-md-6 form-group">
                    <label for="" class="label">Contraseña</label>
                    <input type="text" class="form-control" placeholder="indique su contraseña"
                        aria-label="indique su contraseña" />

                </div>

                <div class="col-md-6 form-group">
                    <label for="" class="label">Confirme Contraseña</label>
                    <input type="text" class="form-control" placeholder="indique su contraseña"
                        aria-label="indique su contraseña" />

                </div>

                <div class="text-center signup-form-button"><button type="submit" class="btn btn-primary">Registrar</button></div>
            </div>
            <!--
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
                -->
        </form>
    </div>
</div>

</template>

<script lang="ts">
export default {
    name: "RegistroComponent",
    methods: {
    } 
}
</script>