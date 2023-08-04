<template>
    <div class="container pagina-datos">

        <div class="col-lg-8">
            <form action="" class="signup-form" @submit.prevent="onRegister">
                <h1 class="title">Registro de usuario</h1>
                <!--<div v-for="(error,index) in formError" :key="index">
          <span class="error">{{error}}</span><br/>
        </div>-->
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="nombre" class="label">Nombre (*)</label>
                        <input type="text" class="form-control" name="nombre" v-model="formData.nombre"
                            placeholder="indique su nombre" aria-label="indique su nombre"
                            :class="{ error: formError.nombre }" />
                        <span v-if="formError.nombre" class="error-form">{{ formError.nombre }}</span>
                    </div>
                    <div class="col-md-8 form-group">
                        <label for="apellidos" class="label">Apellidos (*)</label>
                        <input type="text" class="form-control" name="apellidos" v-model="formData.apellidos"
                            placeholder="indique sus apellidos" aria-label="indique sus apellidos"
                            :class="{ error: formError.apellidos }" />
                            <span v-if="formError.apellidos" class="error-form">{{ formError.apellidos }}</span>

                    </div>
                    <div class="col-md-8 form-group">
                        <label for="email" class="label">Correo electrónico (*)</label>
                        <input type="email" class="form-control" name="email" v-model="formData.email"
                            placeholder="indique su correo electrónico" aria-label="indique su correo electrónico"
                            :class="{ error: formError.email }" />
                            <span v-if="formError.email" class="error-form">{{ formError.email }}</span>

                    </div>
                    <div class="col-md-6 form-group">
                        <label for="pass" class="label">Contraseña (*)</label>
                        <input type="password" class="form-control" name="pass" v-model="formData.password"
                            placeholder="indique su contraseña" aria-label="indique su contraseña"
                            :class="{ error: formError.password }" />
                            <span v-if="formError.password" class="error-form">{{ formError.password }}</span>


                    </div>
                    <div class="col-md-8 form-group info-form">
                        (*) campos obligatorios
                    </div>
                    <div class="text-center signup-form-button">
                        <button type="submit" class="btn btn-primary" aria-label="registrarse en el portal"
                            :class="{ loading }">Registrar</button>
                        <button type="button" class="btn btn-warning borrar-form"
                            aria-label="limpiar formulario de registro" @click="borrarForm">Borrar</button>
                    </div>

                </div>

            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';

import * as Yup from 'yup'
import axios from 'axios';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'RegistroComponent',
    setup() {
        let formData = ref({ nombre: '', apellidos: '', email: '', password: '' })
        let formError = ref({});
        let loading = ref(false);

        const router = useRouter()

        const schemaForm = Yup.object().shape({
            nombre: Yup.string().required(),
            apellidos: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(4),

        })
        const borrarForm = () => {
            formData.value = { nombre: '', apellidos: '', email: '', password: '' }
            formError.value = {}
        }
        const onRegister = async () => {
            console.log(formData.value)
            formError.value = {};
            loading.value = true;
            try {
                await schemaForm.validate(formData.value, { abortEarly: false, strict: false })
                try {
                    axios.post(`http://localhost:8080/api/usuarios`, formData.value).then(response => {
                        console.log(response)
                        Swal.fire('Alta', 'Se ha registrado su usuario correctamente, recibirá un correo para confirmar el alta');
                        borrarForm()
                        router.push("/acceso")  
                    }).catch(error => {
                        Swal.fire(
                            'Alta de usuario',
                            'Ha habido problemas con su registro: ' + error.response.data.message,
                            'error'
                        )
                        console.log(error.response.data.message)
                    })
                } catch (error) {
                    console.log(error)
                }
            } catch (e: any) {
                console.dir(e)
                e.inner.forEach(element => {
                    formError.value[element.path] = element.message
                });

            }
            loading.value = false
        }
        return {
            formData,
            formError,
            loading,
            borrarForm,
            onRegister
        }
    }
})
</script>

<style lang="css">
.form-control.error {
    border-color: #faa;
    background-color: #ffeded;
}

.error {
    color: red;
}
</style>