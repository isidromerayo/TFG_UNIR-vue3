<template>
    <div class="pagina-datos container">
        <h1>Acceso a tu cuenta en el portal TFG</h1>
        <div class="col-lg-8">
            <form class="form-signin" @submit.prevent="loginUsuario">
                <div>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" name="email" v-model="formLogin.email" class="form-control"
                        placeholder="Email address" required autofocus>
                </div>
                <div>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" name="password" v-model="formLogin.password"
                        class="form-control" placeholder="Password" required>
                </div>
                <div>
                    <button class="btn btn-primary btn-login" type="submit">Acceso</button>
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
    name: 'AccesoComponent',
    setup() {
        let formLogin = ref({ email: '', password: '' })
        let formError = ref({});
        const router = useRouter();

        const schemaForm = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()

        })

        const loginUsuario = () => {
            axios.post("http://localhost:8080/api/auth", formLogin.value).then(response => {
                console.log(response.data)
                console.log(response.headers)
                // mensaje de OK y redireccionar a parte privada
                Swal.fire('Acceso', 'Logeado correctamente');
                sessionStorage.setItem("usuario",JSON.stringify(response.data))
                sessionStorage.setItem("isLoggedIn","true")
                router.push('/mis-cursos')
            }).catch(error => {
                Swal.fire('Problemas acceso', 'No se ha podido logear, revise usuario/contraseña', 'error');

            })

        }

        return {
            loginUsuario,
            formLogin,
            formError,
        }
    }
})

</script>