<template>
  <nav @click="$event.target.tagName != 'BUTTON' ? Dropdown ? Dropdown = false : '' : ''" class="w-full h-16 bg-white dark:bg-Prt240 fixed top-0 flex z-40 shadowNav1">
    <div class="w-full px-4 1md:px-12 mx-auto flex justify-between shadowNav2" style="max-width: 1280px">    
      <router-link @click="SetSeccion('Inicio')" class="flex items-center" to="/">          
        <img v-bind:src="Theme == 'light' ? require('@/assets/Images/LogoLight.png') : require('@/assets/Images/LogoDark.png')" class="w-7" alt="LogoWeb">
        <span class="pl-2 text-black dark:text-white font-bold font-Hind text-2xs 1md:text-sm">Desarrollador web</span>
      </router-link>
      <div class="flex-auto flex items-center justify-end 1md:hidden">
        <button @click="Open = !Open" class="w-10 h-10 bg-gray-200 dark:bg-Prt310 rounded-full transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white">
          <i :class="[!Open ? 'fas fa-bars' : 'fab fa-mixer']"></i>
        </button>
      </div>           
      <div class="w-full 1md:w-auto flex-auto 1md:flex-none top-16 1md:top-0 fixed 1md:relative inset-0 -left-full 1md:left-0 overflow-y-scroll 1md:overflow-y-visible transition-all 1md:transition-none duration-500" :class="[Open ? 'left-0 opacity-100' : '-left-full opacity-0 1md:opacity-100']">                
        <ul class="min-h-full min-w-full py-16 1md:py-0 inline-flex flex-col 1md:flex-row justify-center items-center 1md:items-stretch bg-gray-100 1md:bg-transparent dark:bg-gray-700 1md:dark:bg-transparent font-light font-Chakra text-sm">                    
          <li v-for="link in Links" :key="link" class="table mb-5 1md:mb-0 1md:mt-0.5 mx-auto 1md:mx-2 border-b-3" :class="[SeccActual != link.Nombre ? 'border-transparent' : 'pb-2 1md:pb-0 border-indigo-500 dark:border-emerald-600']">
            <router-link @click="SetSeccion(link.Nombre)" class="table-cell align-middle transition duration-300" :class="[SeccActual != link.Nombre ? 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white' : 'text-black dark:text-white']" :to="link.Path">{{ link.Nombre }}</router-link>
          </li>
          <li class="table mt-5 1md:my-0.5 mx-auto 1md:ml-6">
            <i @click="ChangeTheme()" class="table-cell align-middle mx-auto cursor-pointer text-black dark:text-white text-base" :class="[Theme == 'light' ? 'fas fa-sun' : 'far fa-moon']"></i>
          </li>            
          <li class="my-3 mx-7 bg-Prt30 dark:bg-gray-600 hidden 1md:block" style="padding-left: 1px; padding-right: 1px"></li>          
          <li v-show="false" class="mt-5 1md:mt-0 mx-auto flex items-center">
            <router-link @click="SetSeccion('Loguin')" class="px-3 py-2.5 bg-BtnLight dark:bg-BtnDark rounded-md text-white text-1/2xs 1/2lg:text-xs" to="/Loguin">Login <i class="ml-1.5 fa-solid fa-right-to-bracket text-xxs"></i></router-link>
          </li>            
          <li v-show="true" class="mt-5 1md:mt-0 mx-auto flex flex-col justify-center items-center text-1/2xs 1/2lg:text-xs">              
            <button @click="Dropdown = !Dropdown" class="px-3 py-2.5 bg-BtnLight dark:bg-BtnDark rounded-md text-white ActiveDrw">Gestionar <i class="ml-1.5 fas fa-angle-down text-xxs"></i></button>                                                                                                      
            <ul v-show="Dropdown" class="w-fit mx-auto mt-4 1md:mt-0 bg-white dark:bg-Prt310 1md:dark:bg-Prt260 border-2 border-Prt30 dark:border-Prt200 rounded-1/2md 1md:rounded-t-none relative 1md:absolute 1md:top-full overflow-hidden text-gray-400 dark:text-Prt160 text-center">
              <li class="min-w-max py-2"><router-link @click="SetSeccion('Panel')" class="w-fit px-3.5 py-2 transition duration-500 hover:bg-Prt20 dark:hover:bg-gray-800 1md:dark:hover:bg-Prt200" to="/Panel"><i class="mr-1.5 fas fa-file-alt"></i> Mis datos</router-link></li>              
              <li class="min-w-max"><button @click="DeleteToken()" class="w-full px-3.5 py-2 transition duration-500 hover:bg-Prt20 dark:hover:bg-gray-800 1md:dark:hover:bg-Prt200"><i class="mr-1.5 fas fa-running"></i> Salir</button></li>
            </ul>                                            
          </li>        
        </ul>
      </div>        
    </div>
  </nav>  
  <router-view @click="Dropdown ? Dropdown = false : ''" class="pt-16 dark:bg-gray-700"/>  
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default{
  name: 'Menu',
  data(){      
    return{
      Cargando: true,
      Open: false,
      Dropdown: false,
      Links: [
        {Nombre: 'Inicio', Path: '/'},
        {Nombre: 'Capacidades', Path: '/Capacidades'},
        {Nombre: 'Proyectos', Path: '/Proyectos'},
        {Nombre: 'Contacto', Path: '/Contacto'}
      ]
    }
  },
  watch: {
    SeccActual: {handler(){if(this.Open && window.innerWidth < 810) this.Open = !this.Open}},
    Open: {handler(e){this.HiddenBody(e)}}
  },
  computed: {
    ...mapState(['SeccActual', 'Jwt', 'Theme'])
  },
  methods: {
    ...mapActions(['DeleteToken', 'VrfData', 'ChangeTheme']),
    ...mapMutations(['SetSeccion', 'HiddenBody'])    
  },
  mounted(){
    setTimeout(()=> {
      document.getElementById('LoaderHome').style.display = 'none'
      this.HiddenBody(false)
    }, 100)        
  }
}
</script>