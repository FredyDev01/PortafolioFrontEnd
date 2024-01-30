<template>
  <section id="Ctn-Proyect" class="w-full">
    <div
      v-show="!listProjects.length"
      class="w-full flex justify-center items-center"
    >
      <div
        class="max-w-screen-MdXs px-4 py-6 mt-28 mb-16 mx-8 1/2sm:mx-12 bg-gray-200 dark:bg-Prt230 rounded-md border-2 border-gray-300 dark:border-gray-600"
      >
        <i
          class="fas fa-folder-open table mx-auto text-5xl text-gray-400 dark:text-Prt130"
        />
        <h1
          class="font-Silkscreen font-extrabold text-Prt130 text-center mt-4 mb-3"
        >
          Sin datos
        </h1>
        <p class="text-Prt130 text-center text-sm">
          No se encontraron los datos de los proyectos, pero puede intentar
          cambiar los filters o esperar a que se registren proyectos dentro de
          la seccion "Proyectos".
        </p>
      </div>
    </div>
    <div
      v-show="listProjects.length"
      class="w-full pt-24 px-8 1/2sm:px-12 lg:px-14 1/2xl:px-20"
    >
      <main
        class="grid grid-cols-6 gap-x-8 1md:gap-x-5 lg:gap-x-8 2lg:gap-x-10 gap-y-14 MnXs:gap-y-12 1/3md:gap-y-14"
        @click="clickProject($event)"
      >
        <div
          v-for="(project, index) in listProjects"
          :key="project"
          class="col-span-6 1/3md:col-span-3 lg:col-span-2 flex justify-center"
        >
          <div
            class="w-90% MdXs:w-72 1/3md:w-full 1md:w-90% 2md:w-80% 1/2lg:w-75% lg:w-full h-full borderer-4 borderer-Prt40 dark:borderer-Prt230 rounded-lg overflow-hidden flex flex-col FondoTest"
          >
            <div class="w-full CtnProyecto">
              <div
                class="w-full h-40 1/3md:h-38 1/2md:h-40 lg:h-38 1/2xl:h-44 overflow-hidden relative transition-all duration-500 imageProyect"
              >
                <div
                  class="w-full h-full transition-all duration-500 blur-image"
                >
                  <img
                    :alt="project.nameImage"
                    class="w-full h-full object-cover transition-all duration-500"
                    :src="project.urlImage"
                  />
                </div>
                <div
                  class="w-full h-full flex justify-center items-center cursor-pointer absolute inset-0 opacity-0 transition-all duration-500"
                  :data-index="index"
                  style="backdrop-filter: blur(3px)"
                >
                  <button
                    class="w-10 h-10 pointer-events-none flex justify-center items-center bg-indigo-500 dark:bg-emerald-600 rounded-3xl text-white text-1/2xs"
                  >
                    <i class="fas fa-eye" />
                  </button>
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 bg-Prt40 dark:bg-Prt230 borderer-t-4 borderer-Prt40 dark:borderer-Prt230 flex-auto flex flex-col justify-center items-center"
            >
              <h4
                class="w-full mb-2 truncate text-gray-600 dark:text-gray-200 font-bold font-Silkscreen text-left text-sm lg:text-base2"
              >
                {{ project.title }}
              </h4>
              <p
                class="w-full mb-2.5 text-Prt120 dark:text-Prt140 font-sans text-left text-1xs customTruncate"
              >
                {{ project.functionality }}
              </p>
              <Splide
                class="max-w-xl mt-2 flex justify-center items-center cursor-grab text-Prt120 dark:text-Prt90 font-sans text-1/2xs"
                :options="settings"
              >
                <SplideSlide
                  v-for="tecnology in project.technologies"
                  :key="tecnology"
                  class="px-1 py-1.5"
                >
                  <span
                    class="px-2 py-1.5 bg-white dark:bg-gray-600 rounded-sm select-none"
                  >
                    {{ tecnology }}
                  </span>
                </SplideSlide>
              </Splide>
            </div>
          </div>
        </div>
      </main>
      <CmpModal :dataModal="listProjects[index]" @close="openModal(null)" />
    </div>
  </section>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { mapState } from 'vuex'

import { hiddenBody } from '@/utils/appearance'

import CmpModal from './CmpModal.vue'

export default {
  name: 'CmpList',
  components: {
    Splide,
    SplideSlide,
    CmpModal,
  },
  data() {
    return {
      index: null,
      settings: {
        focus: 'center',
        autoWidth: true,
        pagination: false,
        classes: { arrows: 'hidden' },
      },
    }
  },
  computed: {
    ...mapState({
      loadingProjects: (state) => state.portfolio.project.loading,
      listProjects: (state) => state.portfolio.project.list,
    }),
  },
  methods: {
    clickProject(e) {
      const { index } = e.target.dataset
      if (index) {
        this.openModal(index)
      }
    },
    openModal(index) {
      hiddenBody(!!index)
      this.index = index
    },
  },
}
</script>

<style scoped>
.imageProyect:hover > div > img {
  transform: scale(1.15);
}
.imageProyect:hover > div {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
.customTruncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
