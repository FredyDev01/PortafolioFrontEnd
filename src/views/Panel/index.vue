<template>
    <div class="min-h-screen  dark:bg-gray-700">
        <header class="py-20 1/2lg:py-24 mx-auto bg-no-repeat bg-cover bg-center 1/2sm:bg-fixed text-center" :style="[Theme == 'light' ? {backgroundImage: 'linear-gradient(to right, #6365f1cc , #6365f1cc), url('+ require('@/assets/Images/FondoPanel.jpeg') +')'} : {backgroundImage: 'linear-gradient(to right, #18a576de , #18a576de), url('+ require('@/assets/Images/FondoPanel.jpeg') +')'}]">
            <div class="px-10 mx-auto" style=" max-width: 1280px">
                <h1 class="text-white font-bold font-Poppins text-center text-5xl MdSm:text-5/2xl 2lg:text-6xl z-10">Fredy, bienvenido al panel</h1>
                <p class="mt-8 1sm:mt-10 MdSm:mt-7 mx-auto text-white max-w-lg font-light font-Rajdhani text-sm MdXs:text-base">
                    Es una seccion destinada a administrar todos tu avances, ya sean proyectos,
                    conocimientos o habilidades, esto en base a distintos formularios, presentes en esta
                    interfaz.
                </p>
            </div>
        </header> 
        <main class="w-full bg-gray-100 dark:bg-Prt260 border-b-2 border-gray-200 dark:border-gray-700 overflow-x-scroll sm:overflow-auto">            
            <div class="min-w-VwMenu px-5 pb-5 pt-2 flex flex-wrap justify-center font-Ubuntu text-xs 1/2lg:text-sm">
                <button @click="ChangeTable('Conocimientos')" class="px-4 py-3 mt-3 rounded-full border-indigo-400 dark:border-emerald-600 font-light" :class="[ShowSeccion == 'Conocimientos' ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white' : 'border text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white']"><i class="fas fa-graduation-cap mr-2"></i> Gest. conocimientos</button>
                <button @click="ChangeTable('Habilidades')" class="px-4 py-3 mt-3 mx-5 rounded-full border-indigo-400 dark:border-emerald-600 font-light" :class="[ShowSeccion == 'Habilidades' ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white' : 'border text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white']"><i class="fas fa-hands-helping mr-2"></i> Gest. habilidades</button>
                <button @click="ChangeTable('Proyectos')" class="px-4 py-3 mt-3 rounded-full border border-indigo-400 dark:border-emerald-600 font-light" :class="[ShowSeccion == 'Proyectos' ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white' : 'text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white']"><i class="far fa-file-code mr-2"></i> Gest. proyectos</button>
            </div>
        </main>         
        <section class="py-28 max-w-screen-1/2xl mx-auto">                        
            <div class="px-0 md:px-10 mb-7 md:mb-20 flex items-start md:items-center flex-col md:flex-row">
                <h1 class="px-10 md:px-0 table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl">Tabla {{ShowSeccion.toLowerCase()}}<hr class="border-0 border-b-4 rounded-full border-indigo-500 dark:border-emerald-600 w-1/3 mt-1"></h1>
                <div class="w-full md:w-auto flex-auto flex flex-col md:flex-row justify-end items-start md:items-center">
                    <div class="w-full md:w-auto py-7 md:py-0 mt-10 md:mt-0 mb-16 md:mb-0 bg-gray-100 dark:bg-Prt300 md:bg-transparent">
                        <form @submit.prevent="SetDataFilt({Busq: TxtBusq})" class="w-80% MdXs:w-70% MnSm:w-60% sm:w-55% md:w-full mx-auto md:mx-0 flex">
                            <input v-model="TxtBusq" type="text" class="w-full md:w-48 pl-3 pr-10 py-3 bg-white dark:bg-gray-700 md:bg-transparent rounded-l-md border-2 border-r-0 border-white dark:border-gray-700 md:border-gray-300 md:dark:border-Prt180 transition duration-300 focus:outline-none focus:border-indigo-500 dark:focus:border-emerald-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white text-2xs" placeholder="Buscar registro">
                            <button type="submit" class="px-3.5 md:px-3 bg-indigo-400 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-500 dark:hover:bg-emerald-700 rounded-r-md">
                                <i class="fas fa-search text-white text-xs"></i>
                            </button>
                        </form>                        
                    </div>
                    <button @click="OpenModal()" class="px-3 py-2.5 ml-10 md:ml-7 bg-indigo-400 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-500 dark:hover:bg-emerald-700 rounded-md text-white font-Maven text-xs">Nuevo <i class="fas fa-plus ml-1"></i></button>
                </div>
            </div>                                        
            <main class="px-10">            
                <Tabla_Conocimientos v-if="ShowSeccion == 'Conocimientos'"></Tabla_Conocimientos>
                <Tabla_Habilidades v-if="ShowSeccion == 'Habilidades'"></Tabla_Habilidades>
                <Tabla_Proyectos v-if="ShowSeccion == 'Proyectos'"></Tabla_Proyectos>                                        
            </main>                            
        </section>
    </div>
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Tabla_Conocimientos from '@/components/Panel/Conocimiento/cmpConocimientos'
import Tabla_Habilidades from '@/components/Panel/Habilidades/cmpHabilidades'
import Tabla_Proyectos from '@/components/Panel/Proyectos/cmpProyectos'

export default {
    data(){
        return{TxtBusq: ''}
    },
    computed: {        
        ...mapState('StorePanel', ['ShowSeccion']),
        ...mapState(['Theme'])
    },
    methods: {
        ...mapMutations('StorePanel', ['SetDataFilt', 'SetShowSeccion']),
        ...mapActions('StorePanel', ['OpenModal']),
        ChangeTable(Seccion){                                      
            this.SetShowSeccion(Seccion)
            this.TxtBusq = ''
            this.SetDataFilt({Busq: '', Ord: 1, Page: 1})            
        }
    },
    components:{
        Tabla_Conocimientos, 
        Tabla_Habilidades, 
        Tabla_Proyectos
    }
}
</script>