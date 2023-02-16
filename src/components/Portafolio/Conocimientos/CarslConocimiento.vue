<template> 
  <section @click="EventModal($event.target)" id="Ctn-Conoci" class="w-full">  
    <LoadingData v-if="Cargando" tltLoader="Conocimientos..."></LoadingData>
    <Splide v-else :options="Settings" :has-track="false" class="px-4 MdXs:px-12">
      <SplideTrack>
        <SplideSlide class="py-5" v-for="(slide, ind) in ArrayConocimientos" :key="slide">
          <div class="w-52 h-full px-4 py-6 bg-white dark:bg-Prt250 rounded-md transform transition duration-300 hover:-translate-y-2 text-center flex flex-col justify-center">
            <img :src="slide.UrlImage" :alt="'Image-' + slide.Tecnologia" class="w-8 mx-auto">
            <div class="mt-3 mb-2 flex justify-center items-center flex-wrap">
              <h4 class="mx-2 mt-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm lg:text-base2">{{slide.Titular}}</h4>
              <span class="px-1.5 py-1 mt-1 bg-Prt40 dark:bg-Prt200 rounded-1/2md text-gray-500 dark:text-Prt90 font-sans text-1/2xs">{{slide.Nivel}}</span>                
            </div>
            <p class="text-Prt120 dark:text-Prt140 font-sans text-1xs">{{slide.Resumen}}</p>                            
            <a role="button" :data-indice="ind" class="py-2.5 px-5 lg:px-4 mx-auto mt-4 transition duration-200 hover:bg-indigo-500 dark:hover:bg-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full cursor-pointer text-indigo-500 dark:text-emerald-600 dark:hover:text-white hover:text-white font-Maven text-xs">Mas datos</a>              
          </div>
        </SplideSlide>
      </SplideTrack>
      <div class="splide__arrows">
        <div class="absolute top-0 left-8 w-5% h-full pointer-events-none hidden MdXs:block" :class="[Theme == 'light' ? 'OpcLightLeft' : 'OpcDarkLeft']"></div>
        <div class="absolute top-0 right-8 w-5% h-full pointer-events-none hidden MdXs:block" :class="[Theme == 'light' ? 'OpcLightRight' : 'OpcDarkRight']"></div>        
        <button class="splide__arrow splide__arrow--prev atras" :class="[Theme == 'light' ? 'Navegation-Light' : 'Navegation-Dark']"><i class="fas fa-angle-left"></i></button>
        <button class="splide__arrow splide__arrow--next adelante" :class="[Theme == 'light' ? 'Navegation-Light' : 'Navegation-Dark']"><i class="fas fa-angle-right"></i></button>
      </div>
    </Splide>        
    <ModalCnm :DataModal="ArrayConocimientos[IndConocimiento]" @close="OpenModal($event)"></ModalCnm>
  </section>
</template>


<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { defineComponent } from '@vue/runtime-core'
import { mapState, mapMutations } from 'vuex'
import ModalCnm from '@/components/Portafolio/Conocimientos/Modal'
import LoadingData from '@/components/General/LoadingData.vue'

export default defineComponent({
  data(){
    return{
      Cargando: true,
      ArrayConocimientos: [],
      IndConocimiento: null,
      Settings: {
        type: 'loop',
        focus: 'center',
        perPage: 'auto',
        autoWidth: true,        
        pagination: false,
        gap: '1.8rem',
        perPage: 3,        
      }
    }
  },  
  computed:{...mapState(['Theme'])},
  methods:{
    ...mapMutations(['HiddenBody']),
    async GetConocimientos(){
      this.Cargando = true      
      const Consult = await this.axios({url: '/Conocimientos/GetData/0', method: 'GET'})         
      this.ArrayConocimientos = Consult.data.Datos
      this.Cargando = false
    }, 
    EventModal(e){
      if(e.tagName == 'A') this.OpenModal(e.dataset.indice)
    },
    OpenModal(ind){   
      this.HiddenBody(ind)
      this.IndConocimiento = ind 
    }    
  },
  mounted(){this.GetConocimientos()},
  components: {
    LoadingData,
    ModalCnm,
    Splide,
    SplideSlide, 
    SplideTrack               
  }
})
</script>