<template>
  <section id="Scc_habilidad" class="w-full">
    <CmpLoading v-if="loadingSkills" tltLoader="Habilidades..."></CmpLoading>
    <main
      v-else
      class="grid grid-cols-1 1/3md:grid-cols-2 gap-8 1/3md:gap-x-10"
    >
      <div v-for="skill in listSkills" :key="skill._id" class="col-span-1">
        <div class="flex justify-between items-center">
          <h4
            class="text-gray-600 dark:text-gray-200 font-Silkscreen text-sm lg:text-base2"
          >
            {{ skill.title }}
          </h4>
          <span class="text-gray-500 dark:text-Prt90 font-sans text-1xs">
            {{ skill.percentage }}%
          </span>
        </div>
        <div
          class="w-full mt-2 bg-indigo-200 dark:bg-Prt250 rounded-md shadow-sm"
        >
          <div
            class="w-0 py-1.5 relative bg-indigo-500 dark:bg-emerald-600 rounded-md transition-all duration-1000 element"
            :data-progress="skill.percentage"
          ></div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import CmpLoading from '../CmpLoading.vue'

export default {
  name: 'CmpList',
  components: { CmpLoading },
  computed: {
    ...mapState({
      listSkills: (state) => state.portfolio.skill.list,
      loadingSkills: (state) => state.portfolio.skill.loading,
    }),
  },
  watch: {
    listSkills: {
      handler() {
        this.implementObserver()
      },
      deep: true,
    },
  },
  mounted() {
    this.implementObserver()
  },
  methods: {
    implementObserver() {
      if (this.listSkills.length) {
        setTimeout(() => {
          this.effectObserver()
        })
      }
    },
    effectObserver() {
      const elements = document.querySelectorAll('.element')
      let execute = true
      const data = (entradas) => {
        entradas.forEach((e1) => {
          if (e1.isIntersecting && execute) {
            elements.forEach((e2) => {
              e2.style.width = `${e2.dataset.progress}%`
            })
            execute = false
          }
        })
      }
      const observer = new IntersectionObserver(data, {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 1.0,
      })
      elements.forEach((e) => observer.observe(e))
    },
  },
}
</script>
