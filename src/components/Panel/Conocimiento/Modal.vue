<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <main v-if="ShowModal" @click="OpenModal()" class="w-full h-full fixed inset-0" style="z-index: 40; background: rgba(0, 0, 0, .5); animation-duration: .4s"></main>
    </transition>

    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="ShowModal" class="min-w-full MdSm:min-w-min MdSm:max-w-VwModel2 h-full MdSm:h-fit MdSm:max-h-88vh m-0 MdSm:m-auto bg-white dark:bg-gray-700 rounded-none MdSm:rounded-md fixed inset-0 flex flex-col z-50">
            <header class="p-6 border-b border-gray-300 dark:border-gray-600 relative">
                <h1 class="text-Prt120 dark:text-gray-200 font-bold font-Poppins text-lg" style="letter-spacing: .12rem">{{Editar ? 'Act.' : 'Reg.'}} Conocmientos:</h1>   
                <i @click="OpenModal()" class="absolute top-4 right-4 fas fa-times cursor-pointer text-gray-300 dark:text-gray-600 transition duration-500 hover:text-gray-400 dark:hover:text-gray-500"></i>             
            </header>
            <form v-on:submit.prevent="Editar ? SaveEdit() : New()" class="flex-auto flex flex-col overflow-hidden">                
                <section class="flex-auto px-7 MdSm:px-6 py-8 overflow-y-scroll Scroll" :class="[Theme == 'light' ? 'Scroll-Light' : 'Scroll-Dark']">                                        
                    <div class="grid grid-cols-2 gap-x-6 gap-y-7 text-black dark:text-white font-sans text-xs 3sm:text-2xs">      
                        <div class="col-span-2 h-44 border-dashed border-2 border-Prt50 dark:border-Prt200 rounded-lg flex justify-center items-center flex-col">
                            <div v-show="!ImageRef && !DataModal.Base64Image" class="flex items-center flex-col">
                                <i class="fas fa-cloud-upload-alt text-Prt50 dark:text-Prt200 text-5xl"></i>
                                <span class="px-4 mt-3 text-Prt100 dark:text-Prt170 font-light font-Josefin text-center text-xs 3sm:text-sm">Estamos a la espera de cargar la imagen seleccionada</span>                        
                            </div>
                            <img v-show="ImageRef || DataModal.Base64Image" id="ctnImagen" :src="DataModal.Base64Image ? DataModal.Base64Image : ImageRef ? ImageRef + '?timestamp=' + new Date().toLocaleTimeString() : ''" class="w-3/4 h-3/4 object-contain">                        
                        </div>
                        <div class="col-span-2">
                            <label type="button" for="img-foto" class="px-2 py-2 bg-gray-100 dark:bg-Prt250 transition duration-200 hover:bg-white dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-Prt230 hover:border-indigo-400 dark:hover:border-emerald-700 rounded-md cursor-pointer relative text-Prt100 dark:text-Prt170 hover:text-indigo-400 dark:hover:text-emerald-600">
                                <span class="text-xs"><i class="far fa-image mr-1"></i> Subir imagen</span>
                                <input @change="UploadImage($event)" type="file" id="img-foto" class="absolute inset-0 -z-20" accept=".jpg,.png,.gif" v-bind:required="!Editar">
                            </label>                                                        
                        </div>                                    
                        <div class="col-span-2 1/2sm:col-span-1 mt-7 relative flex items-center text-xs 3sm:text-2xs">                                                                                 
                            <i class="absolute left-3 far fa-file-code pointer-events-none text-Prt100 dark:text-Prt170"></i>
                            <input v-model="DataModal.Titular" type="text" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese la tecnologia" required>                                                        
                        </div>                        
                        <div class="col-span-2 1/2sm:col-span-1 mt-7 relative flex items-center text-xs 3sm:text-2xs">                                                                                
                            <i class="absolute left-3 far fa-star-half pointer-events-none text-Prt100 dark:text-Prt170"></i>                            
                            <select v-model="DataModal.Nivel" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md appearance-none text-Prt100 dark:text-Prt170" required>
                                <option class="bg-white text-black" value="">Ingrese el nivel</option>
                                <option class="bg-white text-black" value="Regular">Regular</option>
                                <option class="bg-white text-black" value="Medio">Medio</option>
                                <option class="bg-white text-black" value="Basico">Basico</option>
                            </select>                                                            
                            <i class="absolute right-3 fas fa-chevron-down pointer-events-none text-Prt100 dark:text-Prt170 text-xxs"></i>                                                           
                        </div>                                            
                        <div class="col-span-2 mt-5 relative flex text-xs 3sm:text-2xs">                                                
                            <i class="absolute top-4 left-3 fas fa-code-branch pointer-events-none text-Prt100 dark:text-Prt170"></i>
                            <textarea v-model="DataModal.Resumen" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" style="min-height: 110px; max-height: 170px" placeholder="Resumen de la tecnologia" required></textarea>                        
                        </div>                                                
                        <div class="col-span-2 mt-5 relative flex text-xs 3sm:text-2xs">                        
                            <i class="absolute top-4 left-3 fas fa-stream pointer-events-none text-Prt100 dark:text-Prt170"></i>
                            <textarea v-model="DataModal.Descripcion" class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" style="min-height: 140px; max-height: 170px" placeholder="Descripcion de tus conocimientos" required></textarea>
                        </div>
                    </div>                
                </section>
                <footer class="w-full px-6 py-6 MdSm:py-7 border-t border-gray-300 dark:border-gray-600 text-white font-Maven text-xs">
                    <button type="submit" class="px-3 py-2.5 mr-3 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-md"><i class="pr-2 fas fa-save"></i>{{Editar ? 'Actualizar': 'Registrar'}}</button>
                    <button @click="OpenModal()" type="button" class="px-3 py-2.5 bg-red-500 transition duration-300 hover:bg-red-600 rounded-md"><i class="pr-1 fas fa-ban"></i> Cacenlar</button>
                </footer>
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
            ImageRef: '',
            DataModal: {                
                Base64Image: '',
                Titular: '',
                Resumen: '',
                Descripcion: '',
                Nivel: ''
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
        ...mapActions('StorePanel', ['OpenModal', 'GetBase64', 'Nuevo', 'GuardarEditar']),
        SetDataValue(Data){
            this.Editar = Data._id || null
            this.ImageRef = Data.UrlImage || ''    
            this.DataModal.Base64Image = ''
            this.DataModal.Titular = Data.Titular || ''
            this.DataModal.Resumen = Data.Resumen || ''
            this.DataModal.Descripcion = Data.Descripcion || ''
            this.DataModal.Nivel = Data.Nivel || ''
        },
        async UploadImage(e){
            const Test = await this.GetBase64(e)
            console.log(Test)
            this.DataModal.Base64Image = Test
        },
        async New(){
            const Consult = await this.Nuevo(JSON.stringify(this.DataModal))
            if(Consult) this.$emit('ShowData')
        },
        async SaveEdit(){
            const Consult = await this.GuardarEditar({Content: JSON.stringify(this.DataModal), Id: this.Editar})
            if(Consult) this.$emit('ShowData')
        }
    }
}
</script>