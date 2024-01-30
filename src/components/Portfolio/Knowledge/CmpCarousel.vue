<template>
  <section class="w-full">
    <CmpLoading v-if="loadingKnowledges" tltLoader="Conocimientos..." />
    <Splide
      v-else
      class="px-4 MdXs:px-12"
      :hasTrack="false"
      :options="settings"
    >
      <SplideTrack @click="clickKnowledge($event)">
        <SplideSlide
          v-for="(knowledge, index) in listKnowledges"
          :key="knowledge._id"
          class="py-5"
        >
          <div
            class="w-52 h-full px-4 py-6 bg-white dark:bg-Prt250 rounded-md transform transition duration-300 hover:-translate-y-2 text-center flex flex-col justify-center"
          >
            <div class="w-8 mx-auto">
              <img
                :alt="knowledge.nameImage"
                class="imageAdapted"
                :src="knowledge.urlImage"
              />
            </div>
            <div class="mt-3 mb-2 flex justify-center items-center flex-wrap">
              <h4
                class="mx-2 mt-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm lg:text-base2"
              >
                {{ knowledge.title }}
              </h4>
              <span
                class="px-1.5 py-1 mt-1 bg-Prt40 dark:bg-Prt200 rounded-1/2md text-gray-500 dark:text-Prt90 font-sans text-1/2xs"
              >
                {{ knowledge.level }}
              </span>
            </div>
            <p class="text-Prt120 dark:text-Prt140 font-sans text-1xs">
              {{ knowledge.resume }}
            </p>
            <button
              class="py-2.5 px-5 lg:px-4 mx-auto mt-4 transition duration-200 hover:bg-indigo-500 dark:hover:bg-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full cursor-pointer text-indigo-500 dark:text-emerald-600 dark:hover:text-white hover:text-white font-Maven text-xs"
              :data-index="index"
              @click="openModal(index)"
            >
              Mas datos
            </button>
          </div>
        </SplideSlide>
      </SplideTrack>
      <div class="splide__arrows">
        <div
          class="absolute top-0 left-8 w-5% h-full pointer-events-none hidden MdXs:block"
          :class="[theme == 'light' ? 'opcLightLeft' : 'opcDarkLeft']"
        />
        <div
          class="absolute top-0 right-8 w-5% h-full pointer-events-none hidden MdXs:block"
          :class="[theme == 'light' ? 'opcLightRight' : 'opcDarkRight']"
        />
        <button
          class="splide__arrow splide__arrow--prev atras"
          :class="[theme == 'light' ? 'navegationLight' : 'navegationDark']"
        >
          <i class="fas fa-angle-left" />
        </button>
        <button
          class="splide__arrow splide__arrow--next adelante"
          :class="[theme == 'light' ? 'navegationLight' : 'navegationDark']"
        >
          <i class="fas fa-angle-right" />
        </button>
      </div>
    </Splide>
    <CmpModal :dataModal="listKnowledges[index]" @close="openModal(null)" />
  </section>
</template>

<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { mapState } from 'vuex'

import { sections } from '@/enum/index'
import { hiddenBody } from '@/utils/appearance'

import CmpModal from './CmpModal.vue'

import CmpLoading from '@/components/Portfolio/CmpLoading.vue'

export default {
  name: 'CmpCarousel',
  components: {
    Splide,
    SplideSlide,
    SplideTrack,
    CmpModal,
    CmpLoading,
  },
  data() {
    return {
      index: null,
      settings: {
        type: 'loop',
        focus: 'center',
        perPage: 3,
        autoWidth: true,
        pagination: false,
        gap: '1.8rem',
      },
      sections,
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      listKnowledges: (state) => state.portfolio.knowledge.list,
      loadingKnowledges: (state) => state.portfolio.knowledge.loading,
    }),
  },
  methods: {
    clickKnowledge(e) {
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
.opcLightLeft {
  background: linear-gradient(
    to left,
    rgba(255, 0, 0, 0) 0%,
    rgb(237 238 241) 80%
  );
}
.opcLightRight {
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0) 0%,
    rgb(237 238 241) 80%
  );
}
.opcDarkLeft {
  background: linear-gradient(to left, #ff000000 0%, #31394a 80%);
}
.opcDarkRight {
  background: linear-gradient(to right, #ff000000 0%, #31394a 80%);
}
.navegationLight {
  background: rgb(99 102 241);
  color: white;
  opacity: 1 !important;
}
.navegationDark {
  background: rgb(5 150 105) !important;
  color: white;
  opacity: 1 !important;
}
</style>
