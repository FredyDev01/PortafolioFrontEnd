<template>
  <transition
    enterActiveClass="animated fadeIn"
    leaveActiveClass="animated fadeOut"
  >
    <main
      v-show="show"
      class="w-full h-full fixed inset-0 bg-backdrop z-40 duration-300"
      @click="$emit('close')"
    ></main>
  </transition>
  <transition
    enterActiveClass="animated zoomIn"
    leaveActiveClass="animated zoomOut"
  >
    <div
      v-show="show"
      class="fixed inset-0 w-full MnSm:max-w-VwModel h-full MnSm:h-fit MnSm:max-h-85vh m-0 MnSm:m-auto bg-white dark:bg-gray-700 rounded-none MnSm:rounded-lg flex flex-col overflow-hidden z-50 duration-300"
    >
      <header class="relative px-6 py-5 bg-indigo-500 dark:bg-emerald-600 flex">
        <h1
          class="w-full pr-5 truncate text-white font-bold font-Ubuntu text-lg MnSm:text-xl"
        >
          Proyecto: {{ data?.title ?? '' }}
        </h1>
        <i
          class="cursor-pointer text-indigo-400 dark:text-emerald-500 transition duration-200 hover:text-indigo-300 dark:hover:text-emerald-400 fas fa-times"
          @click="$emit('close')"
        ></i>
      </header>
      <section
        class="px-6 py-10 MnSm:py-8 flex-auto overflow-y-scroll scroll text-Prt150 dark:text-gray-400 font-sans"
        :class="[theme == 'light' ? 'scrollLight' : 'scrollDark']"
      >
        <div class="flex justify-center items-center flex-col">
          <div class="w-full">
            <img
              alt="Foto-Proyect"
              class="w-full"
              :src="data?.urlImage ?? ''"
            />
          </div>
          <div
            class="flex flex-wrap justify-center text-gray-500 dark:text-Prt140 font-sans text-1/2xs"
          >
            <span
              v-for="tecnology in data?.technologies ?? []"
              :key="tecnology._id"
              class="px-2 py-1 mx-1.5 mt-4 bg-Prt40 dark:bg-Prt230 rounded-sm"
            >
              {{ tecnology }}
            </span>
          </div>
        </div>
        <div class="mt-10">
          <h4
            class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2"
          >
            Tipo de proyecto:
          </h4>
          <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
            {{ data?.type ?? '' }}
          </p>
        </div>
        <div class="mt-8">
          <h4
            class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2"
          >
            Finalidad:
          </h4>
          <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
            {{ data?.functionality ?? '' }}
          </p>
        </div>
        <div class="mt-8">
          <h4
            class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2"
          >
            Resumen:
          </h4>
          <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
            {{ data?.resume ?? '' }}
          </p>
        </div>
      </section>
      <footer
        class="px-6 py-5 flex justify-center border-t border-gray-300 dark:border-gray-600 font-Maven text-xs"
      >
        <a
          class="px-5 py-3 w-full mr-6 text-indigo-500 dark:text-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full transition duration-300 hover:text-white dark:hover:text-white hover:bg-indigo-500 dark:hover:bg-emerald-600 text-center"
          :href="data?.seeProject ?? ''"
          target="_blank"
          ><i class="mr-1 fas fa-globe"></i> Visitar</a
        >
        <a
          class="px-5 py-3 w-full text-indigo-500 dark:text-emerald-600 border border-indigo-500 dark:border-emerald-600 rounded-full transition duration-300 hover:text-white dark:hover:text-white hover:bg-indigo-500 dark:hover:bg-emerald-600 text-center"
          :href="data?.seeCode ?? ''"
          target="_blank"
        >
          <i class="mr-1 fas fa-code"></i>
          Codigo
        </a>
      </footer>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CmpModal',
  props: { dataModal: { type: Object, default: null } },
  emits: ['close'],
  data() {
    return {
      show: false,
      data: null,
    }
  },
  computed: {
    ...mapState(['theme']),
  },
  watch: {
    dataModal: {
      handler() {
        this.show = !!this.dataModal
        setTimeout(
          () => {
            this.data = this.dataModal ? { ...this.dataModal } : null
          },
          this.dataModal ? 0 : 500,
        )
      },
      deep: true,
    },
  },
}
</script>
