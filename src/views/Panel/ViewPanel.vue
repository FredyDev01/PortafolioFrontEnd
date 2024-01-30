<template>
  <div class="min-h-screen dark:bg-gray-700">
    <header
      class="py-20 1/2lg:py-24 mx-auto bg-no-repeat bg-cover bg-center 1/2sm:bg-fixed text-center"
      :style="[
        theme == 'light'
          ? {
              backgroundImage:
                'linear-gradient(to right, #6365f1cc , #6365f1cc), url(' +
                require('@/assets/images/bgPanel.jpeg') +
                ')',
            }
          : {
              backgroundImage:
                'linear-gradient(to right, #18a576de , #18a576de), url(' +
                require('@/assets/images/bgPanel.jpeg') +
                ')',
            },
      ]"
    >
      <div class="max-w-7xl px-10 mx-auto">
        <h1
          class="text-white font-bold font-Poppins text-center text-5xl MdSm:text-5/2xl 2lg:text-6xl z-10"
        >
          Fredy, bienvenido al panel
        </h1>
        <p
          class="mt-8 1sm:mt-10 MdSm:mt-7 mx-auto text-white max-w-lg font-light font-Rajdhani text-sm MdXs:text-base"
        >
          Es una seccion destinada a administrar todos tu avances, ya sean
          proyectos, conocimientos o habilidades, esto en base a distintos
          formularios, presentes en esta interfaz.
        </p>
      </div>
    </header>
    <main
      class="w-full px-5 pb-5 pt-2 bg-gray-100 dark:bg-Prt260 border-b-2 border-gray-200 dark:border-gray-700 overflow-x-scroll MdSm:overflow-auto"
    >
      <div
        class="min-w-VwMenu flex flex-wrap justify-center font-Ubuntu text-xs 1/2lg:text-sm"
      >
        <button
          class="px-4 py-3 mt-3 rounded-full border-indigo-400 dark:border-emerald-600 font-light"
          :class="[
            showTable === sections.knowledge
              ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white'
              : 'border text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white',
          ]"
          @click="setPanelShowTable(sections.knowledge)"
        >
          <i class="fas fa-graduation-cap mr-2"></i> Gest. conocimientos
        </button>
        <button
          class="px-4 py-3 mt-3 mx-5 rounded-full border-indigo-400 dark:border-emerald-600 font-light"
          :class="[
            showTable === sections.skill
              ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white'
              : 'border text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white',
          ]"
          @click="setPanelShowTable(sections.skill)"
        >
          <i class="fas fa-hands-helping mr-2"></i> Gest. habilidades
        </button>
        <button
          class="px-4 py-3 mt-3 rounded-full border border-indigo-400 dark:border-emerald-600 font-light"
          :class="[
            showTable === sections.project
              ? 'bg-indigo-400 dark:bg-emerald-600 shadow-lg text-white'
              : 'text-indigo-400 dark:text-emerald-600 transition duration-300 hover:bg-indigo-400 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white',
          ]"
          @click="setPanelShowTable(sections.project)"
        >
          <i class="far fa-file-code mr-2" /> Gest. proyectos
        </button>
      </div>
    </main>
    <CmpTableKnowledge
      v-if="showTable === sections.knowledge"
      @changeModal="changeModal($event)"
    />
    <CmpTableProject
      v-if="showTable === sections.project"
      @changeModal="changeModal($event)"
    />
    <CmpTableSkill
      v-if="showTable === sections.skill"
      @changeModal="changeModal($event)"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CmpTableKnowledge from '@/components/Panel/Knowledge/CmpTable.vue'
import CmpTableProject from '@/components/Panel/Project/CmpTable.vue'
import CmpTableSkill from '@/components/Panel/Skill/CmpTable.vue'
import { sections } from '@/enum/index'

export default {
  name: 'PanelView',
  components: {
    CmpTableKnowledge,
    CmpTableProject,
    CmpTableSkill,
  },
  data() {
    return {
      sections,
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      showTable: (state) => state.panel.showTable,
    }),
  },
  created() {
    if (this.showTable === null) {
      this.setPanelShowTable(this.sections.knowledge)
    }
  },
  methods: {
    ...mapMutations(['setPanelShowTable', 'setPanelfilters']),
  },
}
</script>
