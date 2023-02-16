<template>
    <section id="Scc_habilidad" class="w-full">              
        <LoadingData v-if="Cargando" tltLoader="Habilidades..."></LoadingData>        
        <main v-else class="grid grid-cols-1 1/3md:grid-cols-2 gap-8 1/3md:gap-x-10">
            <div v-for="Hbl in ArrayHabilidades" :key="Hbl" class="col-span-1"> 
                <div class="flex justify-between items-center">            
                    <h4 class="text-gray-600 dark:text-gray-200 font-Silkscreen text-sm lg:text-base2">{{Hbl.Titular}}</h4>
                    <span class="text-gray-500 dark:text-Prt90 font-sans text-1xs">{{Hbl.Porcentaje}}%</span>
                </div>
                <div class="w-full mt-2 bg-indigo-200 dark:bg-Prt250 rounded-md shadow-sm">                
                    <div class="w-0 py-1.5 relative bg-indigo-500 dark:bg-emerald-600 rounded-md transition-all duration-1000 scroll-data" :data-Progreso="Hbl.Porcentaje"></div>                
                </div>    
            </div>
        </main>
    </section>        
</template>


<script>
import { defineComponent } from '@vue/runtime-core'
import { mapState } from 'vuex'
import LoadingData from '@/components/General/LoadingData.vue'

export default defineComponent({
    name: 'ListHabilidades',    
    data(){
        return{
            Cargando: true, 
            ArrayHabilidades: []
        }
    },
    methods:{
        async GetHabilidades(){
            this.Cargando = true                        
            const Consult = await this.axios({url: '/Habilidades/GetData/0', method: 'GET'})
            this.ArrayHabilidades = Consult.data.Datos
            this.Cargando = false                              
        },        
        EfectObserver(){                       
            var ListaHbl = document.querySelectorAll('.scroll-data')
            var Ejecutar = true
            const Data = (entradas)=>{                
                entradas.forEach((e)=>{
                    if(e.isIntersecting && Ejecutar){
                        ListaHbl.forEach((e)=> e.style.width = e.dataset.progreso + '%')                            
                        Ejecutar = false
                    }
                })
            }
            const observador = new IntersectionObserver(Data, {root: null, rootMargin: '0px 0px 0px 0px', threshold: 1.0})
            ListaHbl.forEach((e)=> observador.observe(e))
        }
    },
    mounted(){
        this.GetHabilidades().then(()=>{
            if(this.ArrayHabilidades.length) this.EfectObserver()
        })
    },
    components: {LoadingData}
})
</script>