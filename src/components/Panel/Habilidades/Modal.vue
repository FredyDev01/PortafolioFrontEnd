<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <main v-if="ShowModal" @click="OpenModal()" class="w-full h-full fixed inset-0" style="z-index: 40; background: rgba(0, 0, 0, .5); animation-duration: .4s"></main>
    </transition>

    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">            
        <div v-if="ShowModal" class="min-w-full MdSm:min-w-min MdSm:max-w-VwModel2 h-full MdSm:h-fit MdSm:max-h-88vh m-0 MdSm:m-auto bg-white dark:bg-gray-700 rounded-none MdSm:rounded-md fixed inset-0 flex flex-col z-50">
            <div class="p-6 border-b border-gray-300 dark:border-gray-600 relative">
                <h1 class="text-Prt120 dark:text-gray-200 font-bold font-Poppins text-lg" style="letter-spacing: .12rem">Reg. Habilidades:</h1>   
                <i @click="OpenModal()" class="absolute top-4 right-4 fas fa-times cursor-pointer text-gray-300 dark:text-gray-600 transition duration-500 hover:text-gray-500 dark:hover:text-gray-500"></i>             
            </div>
            <form v-on:submit.prevent="Editar ? SaveEdit() : New()" class="flex-auto flex flex-col overflow-hidden">
                <section class="flex-auto px-7 MdSm:px-6 py-8 overflow-y-scroll Scroll" :class="[this.Theme == 'light' ? 'Scroll-Light': 'Scroll-Dark']">                                                                                        
                    <div class="grid grid-cols-2 gap-x-6 gap-y-7 text-black dark:text-white font-sans text-xs 3sm:text-2xs">
                        <div class="col-span-2 1/2sm:col-span-1 relative flex items-center">                                         
                            <i class="absolute left-3 far fa-clipboard pointer-events-none text-Prt100 dark:text-Prt170"></i>
                            <input v-model="DataModal.Titular" type="text" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese su habilidad" required>                            
                        </div>                         
                        <div class="col-span-2 1/2sm:col-span-1 relative flex items-center">
                            <i class="absolute left-3 fas fa-percent pointer-events-none text-Prt100 dark:text-Prt170"></i>                     
                            <input v-model="DataModal.Porcentaje" type="number" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" min="0" max="100" placeholder="Ingrese su porcentaje" required>
                        </div>
                    </div>                            
                </section>                    
                <div class="w-full px-6 py-7 border-t border-gray-300 dark:border-gray-600 text-white font-Maven text-xs">
                    <button type="submit" class="px-3 py-2.5 mr-3 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-md"><i class="pr-2 fas fa-save"></i>{{Editar ? 'Actualizar': 'Registrar'}}</button>
                    <button @click="OpenModal()" type="button" class="px-3 py-2.5 bg-red-500 transition duration-300 hover:bg-red-600 rounded-md"><i class="pr-1 fas fa-ban"></i> Cacenlar</button>
                </div>
            </form>                
        </div>        
    </transition>    
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default{
    data(){
        return{
            Editar: null, 
            DataModal: {
                Titular: '', 
                Porcentaje: ''
            }
        }
    },        
    computed: {
        ...mapState('StorePanel', ['ShowModal', 'DataEdit']),
        ...mapState(['Theme'])
    },
    watch: {DataEdit: {handler(e){this.SetDataValue(e)}, deep:true}},        
    emits: ['ShowData'],
    methods: {
        ...mapActions('StorePanel', ['OpenModal', 'Nuevo', 'GuardarEditar']),
        SetDataValue(Data){            
            this.Editar = Data._id || null
            this.DataModal.Titular = Data.Titular || ''
            this.DataModal.Porcentaje = Data.Porcentaje || ''
        },
        async New(){
            const Consult = await this.Nuevo(JSON.stringify(this.DataModal))
            if(Consult) this.$emit('ShowData')
        },
        async SaveEdit(){
            const Consult = await this.GuardarEditar({Content: JSON.stringify(this.DataModal), Id: this.Editar})
            if(Consult) this.$emit('ShowData')
        }        
    },    
}
</script>