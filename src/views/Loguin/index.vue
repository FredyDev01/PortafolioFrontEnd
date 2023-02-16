<template>
    <div class="w-full min-h-screen pt-16 bg-no-repeat bg-cover bg-center 1/2sm:bg-fixed flex items-center" :style="[Theme == 'light' ? {backgroundImage: 'linear-gradient(to right, #6365f18a , #6365f18a), url('+ require('@/assets/Images/FondoLoguin.png') +')'} : {backgroundImage: 'linear-gradient(to right, #18a5768a , #18a5768a), url('+ require('@/assets/Images/FondoLoguin.png') +')'}]">
        <main class="container py-20 mx-auto flex justify-center">
            <div class="w-85% 1/2sm:w-90 1/2lg:w-96 py-8 px-8 mx-2 1/2sm:mx-0 bg-white dark:bg-gray-700 rounded-lg flex flex-col items-center">                                                                                    
                <div class="w-24 h-24 mb-8">
                    <img :src="require(Theme == 'light' ? '@/assets/Images/ImageLoginLight.png' : '@/assets/Images/ImageLoginDark.png')" class="mb-10 mx-auto w-full h-full object-contain" alt="Imagen_login">                                
                </div>
                <h1 class="table mx-auto text-gray-600 dark:text-white font-bold font-OpenSans text-center text-xl 1/2lg:text-2xl">Bienvenido al login<hr class="w-1/3 mx-auto mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"></h1>                
                <form @submit.prevent="LoggingIn()" class="w-full text-black dark:text-white font-sans text-2xs">
                    <div class="mt-12 relative flex items-center justify-start">
                        <i class="absolute left-3 fas fa-envelope pointer-events-none text-Prt100 dark:text-Prt170"></i>
                        <input v-model="DataUser.Email" type="email" class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese su email" autocomplete="off" required>                    
                    </div>                    
                    <div class="mt-7 relative flex items-center justify-start">                        
                        <i class="absolute left-3 fas fa-lock pointer-events-none text-Prt100 dark:text-Prt170"></i>
                        <input v-model="DataUser.Password" type="password" class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese su contraseña" autocomplete="current-password" required>
                    </div>
                    <button type="submit" class="w-full px-5 py-3 mt-16 table bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-full text-white uppercase font-Maven text-xs">loguearse</button>
                </form>                  
            </div>
        </main>
    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Loguin',
    data(){
        return{DataUser: {Email: '', Password: ''}}
    },
    methods: {
        ...mapActions(['LoginAdmin']),
        LoggingIn(){
            const JsonUser = JSON.stringify(this.DataUser)
            this.DataUser.Email = ''
            this.DataUser.Password = ''
            this.LoginAdmin(JsonUser)
        }
    },
    computed: {...mapState(['Theme'])}
}
</script>