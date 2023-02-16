<template>    
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">        
        <main v-if="DataModal" @click="this.$emit('close', false)" class="fixed inset-0 w-full h-full" style="z-index: 40; background: rgba(0, 0, 0, .5); animation-duration: .4s"></main>
    </transition>

    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="DataModal" class="fixed inset-0 w-full MnSm:max-w-VwModel h-full MnSm:h-fit MnSm:max-h-85vh m-auto bg-white dark:bg-gray-700 rounded-none MnSm:rounded-lg flex flex-col z-50 overflow-hidden" style="animation-duration: 0.7s">                            
            <header class="relative px-6 py-5 bg-indigo-500 dark:bg-emerald-600 flex">
                <h1 class="w-full pr-5 truncate text-white font-bold font-Ubuntu text-lg MnSm:text-xl">Proyecto: {{DataModal ? DataModal.Titular : ''}}</h1>                        
                <i @click="this.$emit('close', false)" class="cursor-pointer text-indigo-400 dark:text-emerald-500 transition duration-200 hover:text-indigo-300 dark:hover:text-emerald-400 fas fa-times"></i>                        
            </header>  
            <main class="px-6 py-10 MnSm:py-8 flex-auto overflow-y-scroll Scroll text-Prt150 dark:text-gray-400 font-sans" :class="[Theme == 'light' ? 'Scroll-Light' : 'Scroll-Dark']">
                <div class="flex justify-center items-center flex-col">
                    <div class="w-full h-16.5">
                        <img :src="DataModal ? DataModal.UrlImage : ''" alt="ImagenPrueba" class="w-full h-full object-contain mx-auto">
                    </div>
                    <span class="px-1.5 py-1 mt-3 bg-Prt40 dark:bg-Prt200 rounded-sm text-gray-500 dark:text-Prt90 font-sans text-1/2xs">
                        {{DataModal ?  DataModal.Nivel : ''}}
                    </span>
                </div>           
                <div class="mt-10">
                    <h4 class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2">Funcionalidad:</h4>
                    <p class="text-gray-500 dark:text-Prt140 text-1xs MnSm:text-2xs">
                        {{DataModal ? DataModal.Resumen : ''}}
                    </p>
                </div>
                <div class="mt-8">
                    <h4 class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2">Mi DataShow:</h4>
                    <p class="text-gray-500 dark:text-Prt140 text-1xs MnSm:text-2xs">                     
                        {{DataModal ? DataModal.Descripcion : ''}}
                    </p> 
                </div>                               
            </main>
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