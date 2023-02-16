<template>
    <div class="px-8 1/2sm:px-12 py-12">        
        <h1 class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl">Acerca de mi <hr class="border-0 border-b-4 rounded-full border-indigo-500 dark:border-emerald-600 w-1/3 mt-1"></h1>
        <div class="mt-9 sm:mt-8 1/2md:mt-12 flex flex-col items-center 1/2md:flex-row 1/2md:items-start">            
            <div class="mr-0 1/2md:mr-7 md:mr-10">                
                <div class="w-44 h-44 1/2md:w-36 1/2md:h-36 md:w-40 md:h-40 relative rounded-full cursor-pointer Carta-foto">
                    <div class="w-full h-full rounded-full border-4 border-gray-300 dark:border-Prt210 transition duration-500 Carta">
                        <div class="w-full h-full absolute inset-0 rounded-full overflow-hidden Cara">                            
                            <img src="@/assets/Images/Fredy_Foto.jpg" class="w-full h-full object-cover" alt="Foto_Fredy">
                        </div>
                        <div class="px-5 w-full h-full absolute inset-0 bg-gray-100 dark:bg-gray-500 rounded-full flex justify-center items-center Cara detras">
                            <span class="dark:text-white font-medium text-center text-xs 1/2md:text-xxs 1/2lg:text-xs">👋 Espero que podamos colaborar en un futuro 👋</span>
                        </div>
                    </div>
                </div>                        
            </div>
            <div class="flex-auto text-Prt150 dark:text-gray-400 font-Rajdhani text-base2 MdXs:text-base">
                <span class="table mx-auto mt-3 1/2md:mt-0 1/2md:ml-0 text-gray-700 dark:text-gray-200 font-bold font-Silkscreen text-lg 1/2lg:text-xl">Hola,</span>
                <p class="mt-2 text-center 1/2md:text-left">                                        
                    soy un desarrollador que se encuentra en aprendizaje constante, con el desarrollo 
                    de diferentes proyectos en los que siempre trato de aprender cosas nuevas, es por ello que 
                    desarrolle mi portafolio con el objetivo de demostrar mi progreso.
                </p>
                <ul class="mt-4 relative -left-0 1/2md:-left-4 flex flex-wrap justify-center 1/2md:justify-start">
                    <li class="mx-4 mt-3">Nombres: <span class="text-gray-800 dark:text-white">Fredy Nemesio</span></li>
                    <li class="mx-4 mt-3">Edad: <span class="text-gray-800 dark:text-white">19 años</span></li>
                    <li class="mx-4 mt-3">Instituto: <span class="text-gray-800 dark:text-white">Senati</span></li>
                </ul>
                <div class="mt-8 relative 1/2md:-left-2 flex flex-wrap justify-center 1/2md:justify-start items-center font-Maven text-xs">                    
                    <a href="./FredyCurriculum.pdf" class="w-full MnXs:w-auto px-5 py-3 mx-2 mt-3 bg-red-500 transition duration-300 hover:bg-red-600 rounded-lg MnXs:rounded-full text-white text-center" download>Desacargar cv <i class="fas fa-file-alt ml-2"></i></a>
                    <router-link @click="SetSeccion('Proyectos')" class="w-full MnXs:w-auto px-5 py-3 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-lg MnXs:rounded-full text-white text-center" to="/Proyectos">Ver proyectos <i class="fa-solid fa-laptop-code ml-2"></i></router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapMutations } from 'vuex'
    
    export default{
        methods: {...mapMutations(['SetSeccion'])}
    }
</script>


<style scoped>
    .Carta-foto{
        perspective: 1000px;
    }
    .Carta-foto:hover .Carta{
        transform: rotateY(180deg);
    }
    .Carta{
        transform-style: preserve-3d;
        transition: all .7s linear;
    }
    .Cara{
        backface-visibility: hidden;
    }
    .Cara.detras{
        transform: rotateY(180deg);
    }
    .font-test{
        font-family: 'Sunflower', sans-serif;
        font-size: 12px;
    }
</style>