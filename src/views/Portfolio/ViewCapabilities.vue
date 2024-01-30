<template>
  <div
    class="text-Prt150 dark:text-gray-400 font-Rajdhani text-base2 MdXs:text-base"
  >
    <div class="px-8 1/2sm:px-12 pt-12 pb-20.5">
      <h1
        class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl"
      >
        List. Conocimientos
        <hr
          class="w-1/3 mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"
        />
      </h1>
      <p class="mt-6">
        <span class="text-black dark:text-white">Mis conocimientos,</span>
        se dan a partir de diferentes lenguajes de programación o frameworks que
        utilizo dentro de mis proyectos, es a partir de ello que esta seccion
        mostrara la descripcion de estos conocimientos junto al nivel de manejo
        que tengo sobre ellos.
      </p>
    </div>
    <div
      class="px-8 1/2sm:px-12 pt-16.3 pb-10 relative flex flex-col items-center bg-Prt40 dark:bg-Prt300"
    >
      <span
        class="absolute w-14 h-14 bg-indigo-500 dark:bg-emerald-600 rounded-full -top-7 shadow-lg flex justify-center items-center"
      >
        <i class="fas fa-file-code text-white"></i>
      </span>
      <CmpCarousel></CmpCarousel>
    </div>
    <div class="px-8 1/2sm:px-12 pt-12 pb-20.5">
      <h1
        class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl"
      >
        List. Hablidades
        <hr
          class="w-1/3 mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"
        />
      </h1>
      <p class="mt-6">
        <span class="text-black dark:text-white">Mis habilidades,</span>
        se fueron desarrollando en base al trabajo en equipo y al desarrollo de
        proyectos en los cuales pude seguir mejorando como persona y desarrollar
        las siguientes habilidades que se muestran junto al progreso que logre
        con estos.
      </p>
    </div>
    <div
      class="px-8 1/2sm:px-12 pb-12 pt-16.3 relative flex justify-center bg-GradientLight dark:bg-GradientDark"
    >
      <span
        class="absolute w-14 h-14 bg-indigo-500 dark:bg-emerald-600 rounded-full -top-7 shadow-lg flex justify-center items-center"
      >
        <i class="fas fa-graduation-cap text-white"></i>
      </span>
      <CmpList></CmpList>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CmpCarousel from '@/components/Portfolio/Knowledge/CmpCarousel.vue'
import CmpList from '@/components/Portfolio/Skill/CmpList.vue'
import { pages, getActions } from '@/enum/index'
import { getDataList } from '@/utils/getData'

export default {
  name: 'ViewAbility',
  components: {
    CmpCarousel,
    CmpList,
  },
  computed: {
    ...mapState({
      listKnowledges: (state) => state.portfolio.knowledge.list,
      listSkills: (state) => state.portfolio.skill.list,
    }),
  },
  mounted() {
    if (this.listKnowledges.length === 0) {
      getDataList(getActions.getKnowledges, pages.portfolio)
    }
    if (this.listSkills.length === 0) {
      getDataList(getActions.getSkills, pages.portfolio)
    }
  },
}
</script>
