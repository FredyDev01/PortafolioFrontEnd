<template>
    <div class="py-12 text-Prt150 dark:text-gray-400 font-Rajdhani text-sm MdXs:text-base">
        <div class="px-8 1/2sm:px-12 pb-13">
            <h1 class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl">List. Proyectos <hr class="w-1/3 mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"></h1>        
            <p class="mt-6">
                El desarrollo de gran parte de <span class="text-black dark:text-white">mis proyectos</span>, 
                se dieron de manera colaborativa con diferentes lenguajes de programación, durante los cuales pude 
                aprender sobre sus usos y el como implementarlos, teniendo como resultado la gran variedad de 
                proyectos que se pueden evidenciar en esta seccion.
            </p>
        </div>
        <div class="pb-5 MnSm:pb-7 1md:py-8 px-0 1md:px-12 border-t-0 1md:border-t border-b border-gray-300 dark:border-Prt190 1md:dark:border-gray-600 font-sans text-2xs">
            <div class="flex flex-col-reverse 1md:flex-row justify-between items-start 1md:items-center">
                <div class="w-full 1md:w-auto px-8 1/2sm:px-12 1md:px-0 overflow-hidden flex flex-col MnSm:flex-row justify-center 1md:justify-start items-center">
                    <div class="relative w-11/12 MdXs:w-3/4 MnSm:w-auto mr-0 MnSm:mr-6">
                        <select @change="DataInp.Tipo = $event.target.value" v-model="DataInp.Tipo" class="w-full py-3 pl-3 pr-16 2md:pr-20 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-md appearance-none focus:outline-none text-gray-400 dark:text-gray-500">
                            <option value="">Tipo de proyecto</option>
                            <option value="Web">Web</option>
                            <option value="Aplicacion">Aplicativo movil</option>
                            <option value="Programa">Programa</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 px-3 pointer-events-none text-gray-400 dark:text-gray-500 flex items-center">
                            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>                    
                    <div class="relative w-11/12 MdXs:w-3/4 MnSm:w-auto mt-4 MnSm:mt-0">
                        <select @change="DataInp.Ord = $event.target.value" v-model="DataInp.Ord" class="w-full py-3 pl-3 pr-16 2md:pr-20 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-md appearance-none focus:outline-none text-gray-400 dark:text-gray-500">
                            <option value="-1">Lo mas reciente</option>
                            <option value="1">Lo mas antiguo</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 px-3 pointer-events-none text-gray-400 dark:text-gray-500 flex items-center">
                            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>                                
                <form @submit.prevent="DataInp.Busq = $event.target['TxtBusq'].value" class="w-full 1md:w-auto mb-5 MnSm:mb-8 1md:mb-0 py-7 1md:py-0 px-8 1/2sm:px-12 1md:px-0 bg-Prt40 dark:bg-Prt300 1md:bg-transparent 1md:dark:bg-transparent flex justify-center 1md:justify-start">                    
                    <input type="text" id="TxtBusq" class="w-80% 1/2sm:w-80 1md:w-44 2md:w-48 py-3 px-3 1md:px-3 bg-white dark:bg-gray-700 1md:dark:bg-transparent 1md:bg-transparent rounded-l-1/2md 1md:rounded-l-md border-2 border-r-0 border-white 1md:border-gray-300 transition duration-300 focus:border-indigo-400 dark:border-gray-700 1md:dark:border-gray-600 focus:outline-none dark:focus:border-emerald-600 dark:placeholder:text-gray-500 text-black dark:text-white" placeholder="Buscar proyecto">
                    <button type="submit" class="px-3 bg-indigo-400 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-500 dark:hover:bg-emerald-500 rounded-1/2md rounded-l-none 1md:rounded-md 1md:rounded-l-none table text-white"><i class="table-cell align-middle fas fa-search"></i></button>
                </form>
            </div>        
            <div class="relative mt-3 MnSm:mt-4 1md:mt-8 px-8 1/2sm:px-12 1md:px-0 -left-0 1md:-left-2 flex flex-wrap justify-center 1md:justify-start">                
                <button v-show="Cargando" class="px-3 py-1.5 mx-2 mt-4 rounded-sm bg-gray-200 dark:bg-Prt230 text-gray-500 dark:text-gray-400">Espere...</button>
                <button v-show="!Cargando" v-for="Tec in ListTec" :key="Tec" @click="addTecnologia($event)" :data-Tecnologia="Tec" class="px-3 py-1.5 mx-2 mt-4 rounded-sm transition duration-300" :class="[DataInp.SlcTec.includes(Tec) ? 'bg-indigo-400 dark:bg-emerald-600 text-white' : 'bg-Prt40 dark:bg-Prt230 text-Prt120 dark:text-Prt90 hover:text-black dark:hover:text-white']">{{Tec}}</button>
            </div>
        </div>
        <ListProyect :DataInp="DataInp"/>                            
    </div>    
</template>


<script>
import ListProyect from '@/components/Portafolio/Proyectos/ListProyectos.vue'

export default {
    name: 'Proyectos', 
    data() {
        return{
            Cargando: true,
            ListTec: [],   
            DataInp: {Tipo: '', Ord: -1, Busq: '', SlcTec: []}      
        }
    },
    methods:{
        async GetTecFiltros(){
            this.Cargando = true
            const Consult = await this.axios({url: '/Proyectos/GetTecnologias', method: 'GET'})                         
            this.ListTec = Consult.data.Datos || []  
            this.Cargando = false
        },
        addTecnologia(e){
            const Tec = e.target.dataset.tecnologia
            const Estado = this.DataInp.SlcTec.indexOf(Tec)
            Estado != -1 ? this.DataInp.SlcTec.splice(Estado, 1) : this.DataInp.SlcTec.push(Tec)            
        }
    },
    mounted(){this.GetTecFiltros()},
    components:{ListProyect}
}
</script>