<template>
  <transition
    enterActiveClass="animated fadeIn"
    leaveActiveClass="animated fadeOut"
  >
    <main
      v-show="show"
      class="w-full h-full fixed inset-0 bg-backdrop z-40 duration-300"
      @click="$emit('close')"
    />
  </transition>
  <transition
    enterActiveClass="animated zoomIn"
    leaveActiveClass="animated zoomOut"
  >
    <div
      v-show="show"
      class="fixed inset-0 w-full MnSm:max-w-VwModel h-full MnSm:h-fit MnSm:max-h-85vh m-auto bg-white dark:bg-gray-700 rounded-none MnSm:rounded-lg flex flex-col overflow-hidden z-50 duration-300"
    >
      <header class="relative px-6 py-5 bg-indigo-500 dark:bg-emerald-600 flex">
        <h1
          class="w-full pr-5 truncate text-white font-bold font-Ubuntu text-lg MnSm:text-xl"
        >
          Tecnologia: {{ data?.title ?? '' }}
        </h1>
        <i
          class="cursor-pointer text-indigo-400 dark:text-emerald-500 transition duration-200 hover:text-indigo-300 dark:hover:text-emerald-400 fas fa-times"
          @click="$emit('close')"
        />
      </header>
      <main
        class="px-6 py-10 MnSm:py-8 flex-auto overflow-y-scroll scroll text-Prt150 dark:text-gray-400 font-sans"
        :class="[theme == 'light' ? 'scrollLight' : 'scrollDark']"
      >
        <div class="flex justify-center items-center flex-col">
          <div class="w-full h-16.5">
            <img
              alt="ImagenPrueba"
              class="w-full h-full object-contain mx-auto"
              :src="data?.urlImage ?? ''"
            />
          </div>
          <span
            class="px-1.5 py-1 mt-3 bg-Prt40 dark:bg-Prt200 rounded-sm text-gray-500 dark:text-Prt90 font-sans text-1/2xs"
          >
            {{ data?.level ?? '' }}
          </span>
        </div>
        <div class="mt-10">
          <h4
            class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2"
          >
            Funcionalidad:
          </h4>
          <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
            {{ data?.resume ?? '' }}
          </p>
        </div>
        <div class="mt-8">
          <h4
            class="mb-1 text-gray-600 dark:text-gray-200 font-Silkscreen text-sm MnSm:text-base2"
          >
            Conocimiento:
          </h4>
          <p class="text-Prt160 dark:text-Prt140 text-1xs MnSm:text-2xs">
            {{ data?.description ?? '' }}
          </p>
        </div>
      </main>
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
