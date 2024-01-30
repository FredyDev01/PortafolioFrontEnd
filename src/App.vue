<template>
  <nav
    class="w-full h-16 bg-white dark:bg-Prt240 fixed top-0 flex z-40 shadowNav1"
    @click="
      $event.target.tagName != 'BUTTON'
        ? dropdown
          ? (dropdown = false)
          : ''
        : ''
    "
  >
    <div
      class="w-full px-4 1md:px-12 mx-auto flex justify-between shadowNav2"
      style="max-width: 1280px"
    >
      <router-link
        class="flex items-center"
        to="/"
        @click="changeView('inicio')"
      >
        <img
          alt="logoDev"
          class="w-7"
          :src="
            theme == 'light'
              ? require('@/assets/images/logoDevLight.png')
              : require('@/assets/images/logoDevDark.png')
          "
        />
        <span
          class="pl-2 text-black dark:text-white font-bold font-Hind text-2xs 1md:text-sm"
        >
          Programador
        </span>
      </router-link>
      <div class="flex-auto flex items-center justify-end 1md:hidden">
        <button
          class="w-10 h-10 bg-gray-200 dark:bg-Prt310 rounded-full transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white"
          @click="open = !open"
        >
          <i :class="[!open ? 'fas fa-bars' : 'fab fa-mixer']"></i>
        </button>
      </div>
      <div
        class="w-full 1md:w-auto flex-auto 1md:flex-none top-16 1md:top-0 fixed 1md:relative inset-0 -left-full 1md:left-0 overflow-y-auto 1md:overflow-y-visible transition-all 1md:transition-none duration-500"
        :class="[
          open ? 'left-0 opacity-100' : '-left-full opacity-0 1md:opacity-100',
        ]"
      >
        <ul
          class="min-h-full min-w-full py-16 1md:py-0 inline-flex flex-col 1md:flex-row justify-center items-center 1md:items-stretch bg-gray-100 1md:bg-transparent dark:bg-gray-700 1md:dark:bg-transparent font-light font-Ubuntu text-sm"
        >
          <li
            v-for="link in links"
            :key="link"
            class="table mb-5 1md:mb-0 1md:mt-0.5 mx-auto 1md:mx-2 border-b-3"
            :class="[
              showView != link.name
                ? 'border-transparent'
                : 'pb-2 1md:pb-0 border-indigo-500 dark:border-emerald-600',
            ]"
          >
            <router-link
              class="table-cell align-middle transition duration-300"
              :class="[
                showView !== link.name
                  ? 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  : 'text-black dark:text-white',
              ]"
              :to="link.path"
              @click="changeView(link.name)"
              >{{ link.name }}</router-link
            >
          </li>
          <li class="table mt-5 1md:my-0.5 mx-auto 1md:ml-6">
            <i
              class="table-cell align-middle mx-auto cursor-pointer text-black dark:text-white text-base"
              :class="[theme == 'light' ? 'fas fa-sun' : 'far fa-moon']"
              @click="changeTheme()"
            ></i>
          </li>
          <li
            class="my-3 mx-7 bg-Prt30 dark:bg-gray-600 hidden 1md:block"
            style="padding-left: 1px; padding-right: 1px"
          ></li>
          <li
            v-show="!jwt.token"
            class="mt-5 1md:mt-0 mx-auto flex items-center"
          >
            <router-link
              class="px-3 py-2.5 bg-BtnLight dark:bg-BtnDark rounded-md text-white text-1/2xs 1/2lg:text-xs"
              to="/Loguin"
              @click="changeView('Loguin')"
              >Login <i class="ml-1.5 fa-solid fa-right-to-bracket text-xxs"></i
            ></router-link>
          </li>
          <li
            v-show="jwt.token"
            class="mt-5 1md:mt-0 mx-auto flex flex-col justify-center items-center text-1/2xs 1/2lg:text-xs"
          >
            <button
              class="px-3 py-2.5 bg-BtnLight dark:bg-BtnDark rounded-md text-white ActiveDrw"
              @click="dropdown = !dropdown"
            >
              Gestionar <i class="ml-1.5 fas fa-angle-down text-xxs"></i>
            </button>
            <ul
              v-show="dropdown"
              class="w-fit mx-auto mt-4 1md:mt-0 bg-white dark:bg-Prt310 1md:dark:bg-Prt260 border-2 border-Prt30 dark:border-Prt200 rounded-1/2md 1md:rounded-t-none relative 1md:absolute 1md:top-full overflow-hidden text-gray-400 dark:text-Prt160 text-center"
            >
              <li class="min-w-max py-2">
                <router-link
                  class="w-fit px-3.5 py-2 transition duration-500 hover:bg-Prt20 dark:hover:bg-gray-800 1md:dark:hover:bg-Prt200"
                  to="/Panel"
                  @click="changeView('Panel')"
                  ><i class="mr-1.5 fas fa-file-alt"></i> Mis datos</router-link
                >
              </li>
              <li class="min-w-max">
                <button
                  class="w-full px-3.5 py-2 transition duration-500 hover:bg-Prt20 dark:hover:bg-gray-800 1md:dark:hover:bg-Prt200"
                  @click="deleteToken()"
                >
                  <i class="mr-1.5 fas fa-running"></i>
                  Salir
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view
    class="pt-16 dark:bg-gray-700"
    @click="dropdown ? (dropdown = false) : ''"
  />
</template>

<script>
import { mapState } from 'vuex'

import { changeView, changeTheme, hiddenBody } from '@/utils/appearance'
import { deleteToken } from '@/utils/token'

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      open: false,
      dropdown: false,
      links: [
        { name: 'inicio', path: '/' },
        { name: 'capacidades', path: '/capacidades' },
        { name: 'proyectos', path: '/proyectos' },
        { name: 'contacto', path: '/contacto' },
      ],
    }
  },
  computed: {
    ...mapState(['showView', 'theme', 'jwt']),
  },
  watch: {
    showView: {
      handler() {
        if (this.open && window.innerWidth < 810) {
          this.open = !this.open
        }
      },
    },
    open: {
      handler(e) {
        hiddenBody(e)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('LoaderHome').style.display = 'none'
      hiddenBody(false)
    })
  },
  methods: {
    changeView,
    changeTheme,
    deleteToken,
  },
}
</script>
