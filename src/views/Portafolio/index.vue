<template>
  <main>
    <section class="py-16 2md:py-20 1/2lg:py-24 bg-repeat-no-repeat bg-center bg-cover 1/2sm:bg-fixed" :style="[Theme == 'light' ? {backgroundImage: 'linear-gradient(to right, #6365f18a , #6365f18a), url('+ require('@/assets/Images/Fondo.jpg') +')'} : {backgroundImage: 'linear-gradient(to right, #18a5768a , #18a5768a), url('+ require('@/assets/Images/Fondo.jpg') +')'}]">
      <main class="mx-auto flex flex-col min-h-screen items-center" style=" max-width: 1280px;">
        <div class="px-8 1/2sm:px-12">
          <h1 class="text-white text-center text-5xl MdXs:text-5/2xl 1sm:text-6xl 1md:text-7xl font-Poppins font-bold mb-20 lg:mb-32 z-10">Bienvenido a mi portafolio</h1>
        </div>
        <main class="w-full px-2 1/2sm:px-0 1/2sm:w-11/12 shadow-xl h-auto">
          <div class="py-5 flex justify-between bg-gray-200 dark:bg-gray-800 rounded-t-md">
            <div class="flex items-center ml-4">
              <span class="w-3 h-3 rounded-full bg-red-400 mx-1"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-400 mx-1"></span>
              <span class="w-3 h-3 rounded-full bg-green-400 mx-1"></span>
            </div>
          </div>
          <main class="overflow-hidden h-auto">    
            <transition name="fade">                           
              <router-view class="bg-white dark:bg-gray-700"/>
            </transition>
          </main>
          <div class="px-6 py-5 bg-gray-200 dark:bg-gray-800 rounded-b-md text-center">
            <span class="text-black dark:text-white text-xs 1/2lg:text-1xs">© Copyright 2022 - Fredy Palomino Huamani.</span>
          </div>
        </main>                
      </main>
    </section>
  </main>
</template>


<script>
  import { mapState } from 'vuex'
  
  export default{
    computed: {...mapState(['Theme'])}
  }
</script>