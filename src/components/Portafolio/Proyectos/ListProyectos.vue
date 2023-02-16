<template>
    <section class="w-full" id="Ctn-Proyect">        
        <LoadingData v-show="Cargando" tltLoader="Proyectos..." class="mt-28 mb-16"></LoadingData>
        <div v-show="!Cargando && !ArrayProyectos.length" class="w-full flex justify-center items-center">            
            <div class="px-4 py-6 mt-28 mb-16 mx-8 1/2sm:mx-12 bg-gray-200 dark:bg-Prt230 rounded-md border-2 border-gray-300 dark:border-gray-600" style="max-width: 400px">
                <i class="fas fa-folder-open table mx-auto text-5xl text-gray-400 dark:text-Prt130"></i>                    
                    <h1 class="font-Silkscreen font-extrabold text-Prt130 text-center mt-4 mb-3">Sin datos</h1>
                    <p class="text-Prt130 text-center text-sm">
                    No se encontraron los datos de los proyectos, pero puede intentar cambiar 
                    los filtros o esperar a que se registren proyectos dentro de la seccion "Proyectos". 
                </p>
            </div>
        </div>
        <div v-show="!Cargando && ArrayProyectos.length" class="w-full pt-24 px-8 1/2sm:px-12 lg:px-14 1/2xl:px-20">
            <main class="grid grid-cols-6 gap-x-8 1md:gap-x-5 lg:gap-x-8 2lg:gap-x-10 gap-y-14 MnXs:gap-y-12 1/3md:gap-y-14">
                <div v-for="(Proyect, ind) in ArrayProyectos" :key="Proyect" class="col-span-6 1/3md:col-span-3 lg:col-span-2 flex justify-center">
                    <div class="w-90% MdXs:w-72 1/3md:w-full 1md:w-90% 2md:w-80% 1/2lg:w-75% lg:w-full h-full border-4 border-Prt40 dark:border-Prt230 rounded-lg overflow-hidden flex flex-col FondoTest">
                        <div class="w-full CtnProyecto">                                                                                                               
                            <div class="w-full h-40 1/3md:h-38 1/2md:h-40 lg:h-38 1/2xl:h-44 overflow-hidden relative transition-all duration-500 image-proyect">
                                <div class="w-full h-full transition-all duration-500 blur-image">
                                    <img class="w-full h-full object-cover transition-all duration-500" :src="Proyect.UrlImage" :alt="'Image-'+Proyect.Proyecto">
                                </div>
                                <div @click="OpenModal(ind)" class="w-full h-full flex justify-center items-center cursor-pointer absolute inset-0 opacity-0 transition-all duration-500" style="backdrop-filter: blur(3px)"> 
                                    <button class="w-10 h-10 flex justify-center items-center bg-indigo-500 dark:bg-emerald-600 rounded-3xl text-white text-1/2xs">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>                  
                        </div>
                        <div class="px-4 py-3 bg-Prt40 dark:bg-Prt230 border-t-4 border-Prt40 dark:border-Prt230 flex-auto flex flex-col justify-center items-center">                
                            <h4 class="w-full mb-2 truncate text-gray-600 dark:text-gray-200 font-bold font-Silkscreen text-left text-sm lg:text-base2">{{Proyect.Titular}}</h4>
                            <p class="w-full mb-2.5 text-Prt120 dark:text-Prt140 font-sans text-left text-1xs truncate-text">{{Proyect.Funcionalidad}}</p>                    
                            <Splide :options="Settings" class="max-w-xl mt-2 flex justify-center items-center cursor-grab text-Prt120 dark:text-Prt90 font-sans text-1/2xs">
                                <SplideSlide v-for="Tec in Proyect.Tecnologias" :key="Tec" class="px-1 py-1.5">                                
                                    <span class="px-2 py-1.5 bg-white dark:bg-gray-600 rounded-sm select-none">{{Tec}}</span>
                                </SplideSlide>
                            </Splide>                    
                        </div>
                    </div>
                </div>
            </main>
            <PageProyectos @ChangePag="Filtros.Page = $event" :Cargando="Cargando" :Maxpage="MaxPage" class="pt-24"></PageProyectos>
            <ModalPry :DataModal="ArrayProyectos[IndProyecto]" @close="OpenModal($event)"></ModalPry>
        </div>        
    </section>
</template>


<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { defineComponent } from '@vue/runtime-core'
import { mapActions, mapMutations } from 'vuex'
import LoadingData from '@/components/General/LoadingData.vue'
import PageProyectos from '@/components/General/Paginador.vue'
import ModalPry from './Modal.vue'

export default defineComponent({
    name: 'ListProyectos',
    data(){
        return{
            Cargando: true,
            ArrayProyectos: [],
            IndProyecto: null,
            Filtros: {
                Tipo: this.DataInp.Tipo, 
                Ord: this.DataInp.Ord, 
                Busq: this.DataInp.Busq, 
                Tec: this.DataInp.Tec || [],
                Page: 1
            },            
            MaxPage: 1,                        
            Settings: {
                focus: 'center', 
                autoWidth: true, 
                pagination: false, 
                classes:{arrows: 'hidden'}
            }
        }
    },
    watch: {
        Filtros: {handler(){this.GetProyectos()}, deep: true},
        DataInp: {handler(e){Object.assign(this.Filtros, e)}, deep: true}
    },
    props:{DataInp: Object},    
    methods: {                     
        ...mapMutations(['HiddenBody']),
        ...mapActions(['DataAlgolia', 'DataFirebase']),        
        async GetProyectos(){
            this.Cargando = true
            try{
                const Consult = await this.axios({url: `/Proyectos/GetData/0?Tipo=${this.Filtros.Tipo}&Ord=${this.Filtros.Ord}&Busq=${this.Filtros.Busq}&Tec=${this.Filtros.Tec.join(', ')}&Page=${this.Filtros.Page}`, method: 'GET'})                
                this.ArrayProyectos = Consult.data.Datos
                this.MaxPage = Consult.data.MaxPage                                                
            }catch(err){
                console.log(err)
                this.ArrayProyectos = []
                this.MaxPage = 0
            }                                                 
            this.Cargando = false            
        },
        OpenModal(ind){
            this.HiddenBody(ind)
            this.IndProyecto = ind
        }
    },
    mounted(){this.GetProyectos()},
    components: {
        Splide, 
        SplideSlide, 
        LoadingData, 
        PageProyectos, 
        ModalPry
    }
})
</script>