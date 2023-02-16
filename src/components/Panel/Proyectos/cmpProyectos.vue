<template>
    <div class="w-full overflow-x-scroll 1/2md:overflow-auto">                          
        <table class="w-full" style="table-layout: fixed; width: 100%; min-width: 600px">
            <thead class="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-white text-center text-sm">
                <tr scope="col">
                    <input @change="SetDataFilt({Ord: DataFilt.Ord == -1 ? 1 : -1})" type="checkbox" id="inpOrden" hidden>                    
                    <th class="py-5 px-2">Id <label for="inpOrden"><i class="text-xxs bg-Prt70 dark:bg-Prt310 transition duration-300 hover:bg-OnBtnLight dark:hover:bg-gray-700 text-white px-2 py-1 rounded-md ml-2 cursor-pointer fas" :class="[DataFilt.Ord == 1 ?  'fas fa-angle-down' : 'fa-angle-up']"> </i></label></th>
                    <th class="px-5">Proyecto</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <colgroup>
                <col span="1" class="w-15%">
                <col span="1" class="w-20%">
                <col span="1" class="w-20% 2md:w-25%">
                <col span="1" class="w-45% 2md:w-40%">
            </colgroup>
            <tbody v-show="ArrayProyectos.length && !Cargando" class="text-center text-gray-500 dark:text-white bg-white dark:bg-Prt260 border-2 border-t-0 border-gray-200 dark:border-gray-600 relative">                                                              
                <tr v-for="Dato in ArrayProyectos" :key="Dato" scope="row" class="text-2xs border-b-2 border-gray-200 dark:border-gray-600">
                    <td class="py-8">{{Dato._id}}</td>
                    <td>
                        <div class="w-full truncate">
                            <span class="w-full truncate">{{Dato.Titular}}</span>
                        </div>
                    </td>
                    <td>
                        <div class="w-50% 2md:w-70% h-12 mx-auto flex items-center justify-center">
                            <img class="mx-auto w-full h-full object-contain" :src="Dato.UrlImage + '?timestamp=' + new Date().toLocaleTimeString()" :alt="'Proyecto-'+Dato.Titular">
                        </div>
                    </td>
                    <td class="font-Maven text-xs">
                        <button @click="Editar(Dato._id)" class="px-3 py-2.5 mx-2 bg-emerald-600 transition duration-300 hover:bg-emerald-700 rounded-md text-white">Editar <i class="fas fa-edit pl-0.5"></i></button>
                        <button @click="Eliminar(Dato._id).then((e)=> {if(e) ShowProyectos()})" class="px-3 py-2.5 mx-2 bg-red-500 transition duration-300 hover:bg-red-600 rounded-md text-white">Eliminar <i class="fas fa-trash pl-0.5"></i></button>
                    </td>
                </tr>                
            </tbody>
        </table>
        <loading v-show="Cargando"></loading>
        <div v-show="!ArrayProyectos.length && !Cargando" class="px-4 py-3 mt-8 bg-gray-100 dark:bg-gray-600 rounded-md" style="min-width: 600px">
            <p class="text-sm text-gray-600 dark:text-gray-200">
                Al parcer <strong>no tiene ningun proyecto</strong> registrado o los filtros utlizados no coinciden con
                los datos que tenemos registrados en nuestra base de datos, intente cambiar los filtros o ingrese un nuevo
                proyecto.
            </p>
        </div>
    </div>    
    <Paginator class="mt-20" @ChangePag="SetDataFilt({Page: $event})" :Cargando="Cargando" :Page="DataFilt.Pag" :Maxpage="MaxPage"></Paginator>
    <ModalPry @ShowData="ShowProyectos()"></ModalPry>    
</template>


<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { defineComponent } from '@vue/runtime-core'
import loading from '@/components/General/LoadingPanel.vue'
import Paginator from '@/components/General/Paginador.vue'
import ModalPry from './Modal'

export default defineComponent({ 
    data(){
        return{
            Cargando: true,
            ArrayProyectos: []
        }
    },
    computed: {...mapState('StorePanel', ['DataFilt', 'MaxPage'])},
    watch: {DataFilt: {handler(){this.ShowProyectos()}, deep: true}},
    methods:{
        ...mapActions('StorePanel', ['Mostrar', 'Editar', 'Eliminar']),            
        ...mapMutations('StorePanel', ['SetDataFilt']),   
        async ShowProyectos(){
            this.Cargando = true
            this.ArrayProyectos = []
            this.ArrayProyectos = await this.Mostrar()
            this.Cargando = false            
        }            
    },   
    mounted(){this.ShowProyectos()},
    components: {loading, Paginator, ModalPry}
})
</script>