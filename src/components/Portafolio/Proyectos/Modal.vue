<template>  
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <main v-if="DataModal" @click="this.$emit('close', false)" class="fixed inset-0 overflow-hidden" style="z-index: 40; background: rgba(0, 0, 0, .5); animation-duration: .4s"></main>
    </transition>
    
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="DataModal" class="fixed inset-0 w-full MnSm:max-w-VwModel h-full MnSm:h-fit MnSm:max-h-85vh m-0 MnSm:m-auto bg-white dark:bg-gray-700 overflow-hidden rounded-none MnSm:rounded-lg z-50 flex flex-col" style="animation-duration: 0.7s">                            
            <header class="relative px-6 py-5 bg-indigo-500 dark:bg-emerald-600 flex">
                <h1 class="w-full pr-5 truncate text-white font-bold font-Ubuntu text-lg MnSm:text-xl">Proyecto: {{DataModal ? DataModal.Titular : ''}}</h1>                        
                <i @click="this.$emit('Close', false)" class="cursor-pointer text-indigo-400 dark:text-emerald-500 transition duration-200 hover:text-indigo-300 dark:hover:text-emerald-400 fas fa-times"></i>                        
            </header>            
            <section class="px-6 py-10 MnSm:py-8 flex-auto overflow-y-scroll Scroll text-Prt150 dark:text-gray-400 font-sans" :class="[Theme == 'light' ? 'Scroll-Light' : 'Scroll-Dark']">
                <div class="flex justify-center items-center flex-col">
                    <div class="w-full">
                        <img :src="DataModal ? DataModal.UrlImage : ''" alt="Foto-Proyect" class="w-full">
                    </div>
                    <div class="flex flex-wrap justify-center text-gray-500 dark:text-Prt140 font-sans text-1/2xs">
                        <span v-for="Tec in DataModal ?  DataModal.Tecnologias : []" :key="Tec" class="px-2 py-1 mx-1.5 mt-4 bg-Prt40 dark:bg-Prt230 rounded-sm">
                            {{Tec}}
                        </span>
                    </div>
                </div>           
                <div class="mt-10">
                    <h4 class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2">Tipo de proyecto:</h4>
                    <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
                        {{DataModal ? DataModal.Tipo : ''}}
                    </p>
                </div>
                <div class="mt-8">
                    <h4 class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2">Finalidad:</h4>
                    <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
                        {{DataModal ? DataModal.Funcionalidad : ''}}
                    </p>
                </div>
                <div class="mt-8">
                    <h4 class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2">Resumen:</h4>
                    <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">                    
                        {{DataModal ? DataModal.Resumen : ''}}
                    </p> 
                </div>                                       
            </section>
            <footer class="px-6 py-5 flex justify-center border-t border-gray-300 dark:border-gray-600 font-Maven text-xs">
                <a :href="DataModal ? DataModal.VerProyecto : ''" target="_blank" class="px-5 py-3 w-full mr-6 text-indigo-500 dark:text-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full transition duration-300 hover:text-white dark:hover:text-white hover:bg-indigo-500 dark:hover:bg-emerald-600 text-center"><i class="mr-1 fas fa-globe"></i> Visitar</a>
                <a :href="DataModal ? DataModal.VerCodigo : ''" target="_blank" class="px-5 py-3 w-full text-indigo-500 dark:text-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full transition duration-300 hover:text-white dark:hover:text-white hover:bg-indigo-500 dark:hover:bg-emerald-600 text-center"><i class="mr-1 fas fa-code"></i> Codigo</a>
            </footer>
        </div>
    </transition>                       
</template>


<script>
import { mapState } from 'vuex'

export default{
    props: {DataModal: Object},
    emits: ['close'],
    computed: {...mapState(['Theme'])}
}   
</script>