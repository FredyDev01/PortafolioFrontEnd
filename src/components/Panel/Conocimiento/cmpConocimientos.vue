<template>
    <div class="w-full overflow-x-scroll 1/2md:overflow-auto">                          
        <table class="w-full" style="table-layout: fixed; width: 100%; min-width: 600px">            
            <thead class="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-white text-center text-sm">
                <tr scope="col">
                    <input @change="SetDataFilt({Ord: DataFilt.Ord == -1 ? 1 : -1})" type="checkbox" id="inpOrden" hidden>                    
                    <th class="py-5 px-2">Id <label for="inpOrden"><i class="text-xxs bg-Prt50 dark:bg-Prt310 transition duration-300 hover:bg-OnBtnLight dark:hover:bg-gray-700 text-white px-2 py-1 rounded-md ml-2 cursor-pointer fas" :class="[DataFilt.Ord == 1 ?  'fas fa-angle-down' : 'fa-angle-up']"> </i></label></th>
                    <th class="px-5">Tecnologia</th>
                    <th class="px-5">Nivel</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <colgroup>
                <col span="1" class="w-15%">
                <col span="1" class="w-20%">
                <col span="1" class="w-20%">
                <col span="1" class="w-10% 2md:w-15%">
                <col span="1" class="w-40% 2md:w-35%">
            </colgroup>
            <tbody v-show="ArrayConocimientos.length && !Cargando" class="relative bg-transparent border-2 border-gray-200 dark:border-Prt230 overflow-hidden text-center text-2xs text-gray-500 dark:text-white">                                                                
                <tr v-for="Dato in ArrayConocimientos" :key="Dato" scope="row" class="border-b-2 border-gray-200 dark:border-Prt230">
                    <td class="py-8">{{Dato._id}}</td>
                    <td>{{Dato.Titular}}</td>
                    <td>{{Dato.Nivel}}</td>
                    <td>
                        <div class="w-50% 2md:w-70% h-10 mx-auto flex items-center justify-center">
                            <img class="mx-auto w-full h-full object-contain" :src="Dato.UrlImage + '?timestamp=' + new Date().toLocaleTimeString()" :alt="'Conocimiento-'+Dato.Titular">
                        </div>
                    </td>
                    <td class="font-Maven text-xs">
                        <button @click="Editar(Dato._id)" class="px-3 py-2.5 mx-2 bg-emerald-600 rounded-md transition duration-300 hover:bg-emerald-700 text-white">Editar <i class="pl-0.5 fas fa-edit"></i></button>
                        <button @click="Eliminar(Dato._id).then((e)=> {if(e) ShowConocimientos()})" class="px-3 py-2.5 mx-2 bg-red-500 rounded-md transition duration-300 hover:bg-red-600 text-white">Eliminar <i class="pl-0.5 fas fa-trash"></i></button>
                    </td>
                </tr>                              
            </tbody>
        </table>
        <loading v-show="Cargando"></loading>       
        <div v-show="!ArrayConocimientos.length && !Cargando" class="px-4 py-3 mt-8 bg-gray-100 dark:bg-gray-600 rounded-md" style="min-width: 600px">
            <p class="text-sm text-gray-600 dark:text-gray-200">
                Al parcer <strong>no tiene ningun conocimiento</strong> registrado o los filtros utlizados no coinciden con
                los datos que tenemos registrados en nuestra base de datos, intente cambiar los filtros o ingrese un nuevo
                conocimientos.
            </p>
        </div>
    </div>
    <Paginator class="mt-20" @ChangePag="SetDataFilt({Page: $event})" :Cargando="Cargando" :Maxpage="MaxPage"></Paginator>
    <ModalCnm @ShowData="ShowConocimientos()"></ModalCnm>
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { defineComponent } from '@vue/runtime-core'
import loading from '@/components/General/LoadingPanel.vue'
import Paginator from '@/components/General/Paginador.vue'
import ModalCnm from './Modal.vue'

export default defineComponent({     
    data(){
        return{
            Cargando: true,
            ArrayConocimientos: []
        }
    },   
    computed: {...mapState('StorePanel', ['DataFilt', 'MaxPage'])},
    watch: {DataFilt: {handler(){this.ShowConocimientos()}, deep: true}},
    methods: {
        ...mapActions('StorePanel', ['Mostrar', 'Editar', 'Eliminar']),
        ...mapMutations('StorePanel', ['SetDataFilt']),
        async ShowConocimientos(){                        
            this.Cargando = true  
            this.ArrayConocimientos = []                                     
            this.ArrayConocimientos = await this.Mostrar()         
            this.Cargando = false            
        }
    },
    mounted(){this.ShowConocimientos()},
    components: {loading, Paginator, ModalCnm}
})
</script>