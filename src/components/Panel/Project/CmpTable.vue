<template>
  <section class="py-28 max-w-screen-1/2xl mx-auto">
    <div
      class="px-0 md:px-10 mb-7 md:mb-20 flex items-start md:items-center flex-col md:flex-row"
    >
      <h1
        class="px-10 md:px-0 table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl"
      >
        Tabla proyectos
        <hr
          class="border-0 border-b-4 rounded-full border-indigo-500 dark:border-emerald-600 w-1/3 mt-1"
        />
      </h1>
      <div
        class="w-full md:w-auto flex-auto flex flex-col md:flex-row justify-end items-start md:items-center"
      >
        <div
          class="w-full md:w-auto py-7 md:py-0 mt-10 md:mt-0 mb-16 md:mb-0 bg-gray-100 dark:bg-Prt300 md:bg-transparent"
        >
          <form
            class="w-80% MdXs:w-70% MnSm:w-60% sm:w-55% md:w-full mx-auto md:mx-0 flex"
            @submit.prevent="currentFilters.search = $event.target[0].value"
          >
            <input
              class="w-full md:w-48 pl-3 pr-10 py-3 bg-white dark:bg-gray-700 md:bg-transparent rounded-l-md border-2 border-r-0 border-white dark:border-gray-700 md:border-gray-300 md:dark:border-Prt180 transition duration-300 focus:outline-none focus:border-indigo-500 dark:focus:border-emerald-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white text-2xs"
              placeholder="Buscar registro"
              type="text"
            />
            <button
              class="px-3.5 md:px-3 bg-indigo-400 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-500 dark:hover:bg-emerald-700 rounded-r-md"
              type="submit"
            >
              <i class="fas fa-search text-white text-xs" />
            </button>
          </form>
        </div>
        <button
          class="px-3 py-2.5 ml-10 md:ml-7 bg-indigo-400 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-500 dark:hover:bg-emerald-700 rounded-md text-white font-Maven text-xs"
          @click="changeModal({ show: true })"
        >
          Nuevo <i class="fas fa-plus ml-1" />
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full min-w-VwMenu table-fixed">
        <thead
          class="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-white text-center text-sm"
        >
          <tr scope="col">
            <th class="py-5 px-2">
              Id
              <label
                class="px-2 py-1 ml-2 bg-Prt50 dark:bg-Prt310 transition duration-300 hover:bg-Prt80 dark:hover:bg-gray-700 text-white rounded-md cursor-pointer text-xxs"
              >
                <input
                  hidden
                  type="checkbox"
                  @change="
                    currentFilters.order = currentFilters.order === -1 ? 1 : -1
                  "
                />
                <i
                  class="fas"
                  :class="[
                    currentFilters.order === 1
                      ? 'fa-angle-down'
                      : 'fa-angle-up',
                  ]"
                >
                </i>
              </label>
            </th>
            <th class="px-5">Proyecto</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <colgroup>
          <col class="w-15%" span="1" />
          <col class="w-20%" span="1" />
          <col class="w-20% 2md:w-25%" span="1" />
          <col class="w-45% 2md:w-40%" span="1" />
        </colgroup>
        <tbody
          v-show="list.length && !loading"
          class="text-center text-gray-500 dark:text-white bg-white dark:bg-Prt260 border-2 border-t-0 border-gray-200 dark:border-gray-600 relative"
          @click="clickProject($event)"
        >
          <tr
            v-for="(project, index) in list"
            :key="project._id"
            class="text-2xs border-b-2 border-gray-200 dark:border-gray-600"
            scope="row"
          >
            <td class="py-8">{{ project._id }}</td>
            <td>
              <div class="w-full truncate">
                <span class="w-full truncate">{{ project.title }}</span>
              </div>
            </td>
            <td>
              <div
                class="w-50% 2md:w-70% h-12 mx-auto flex items-center justify-center"
              >
                <img
                  :alt="project.nameImage"
                  class="imageAdapted"
                  :src="project.urlImage"
                />
              </div>
            </td>
            <td class="font-Maven text-xs">
              <button
                class="px-3 py-2.5 mx-2 bg-emerald-600 transition duration-300 hover:bg-emerald-700 rounded-md text-white"
                data-action="edit"
                :data-index="index"
              >
                Editar <i class="fas fa-edit pl-0.5" />
              </button>
              <button
                class="px-3 py-2.5 mx-2 bg-red-500 transition duration-300 hover:bg-red-600 rounded-md text-white"
                data-action="delete"
                :data-index="index"
              >
                Eliminar <i class="fas fa-trash pl-0.5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <CmpLoading v-show="loading"></CmpLoading>
    </div>
    <div v-show="!loading">
      <div
        v-show="!list.length"
        class="max-w-max mx-auto px-4 py-3 mt-8 bg-gray-100 dark:bg-gray-600 rounded-md"
      >
        <p class="text-sm text-gray-600 dark:text-gray-200">
          Al parcer <strong>no tiene ningun proyecto</strong> registrado o los
          filtros utlizados no coinciden con los datos que tenemos registrados
          en nuestra base de datos, intente cambiar los filtros o ingrese un
          nuevo proyecto.
        </p>
      </div>
      <CmpPaginator
        class="mt-20"
        :maxPage="maxPage"
        :page="currentFilters.page"
        @changePag="currentFilters.page = $event"
      />
    </div>
    <CmpForm
      :dataEdit="modal.dataEdit"
      :show="modal.show"
      @close="changeModal({ show: false })"
    />
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CmpLoading from '@/components/Panel/CmpLoading.vue'
import CmpPaginator from '@/components/UIElements/CmpPaginator.vue'
import {
  pages,
  sections,
  alertResourcesName,
  alertActions,
  getActions,
} from '@/enum/index'
import {
  showMessageModal,
  confirmMessageModal,
  loadingMessageModal,
} from '@/utils/alertsPanel'
import { hiddenBody } from '@/utils/appearance'
import { getDataList } from '@/utils/getData'

import CmpForm from './CmpForm.vue'

export default {
  name: 'CmpTable',
  components: { CmpLoading, CmpPaginator, CmpForm },
  data() {
    return {
      modal: {
        show: false,
        dataEdit: null,
      },
      currentFilters: null,
      sections,
    }
  },
  computed: {
    ...mapState({
      filters: (state) => state.panel.project.filters,
      loading: (state) => state.panel.project.loading,
      list: (state) => state.panel.project.list,
      maxPage: (state) => state.panel.project.maxPage,
    }),
  },
  watch: {
    currentFilters: {
      handler(_, old) {
        if (old) {
          this.setPanelProjectfilters(this.currentFilters)
          getDataList(getActions.getProjects, pages.panel)
        }
      },
      deep: true,
    },
  },
  created() {
    this.currentFilters = { ...this.filters }
    if (this.loading && this.list.length === 0) {
      getDataList(getActions.getProjects, pages.panel)
    }
  },
  methods: {
    ...mapMutations(['setPanelProjectfilters']),

    changeModal({ show, dataEdit }) {
      hiddenBody(show)
      this.modal.show = show ?? false
      this.modal.dataEdit = dataEdit ?? null
    },
    async deleteProject(id) {
      try {
        const { status } = await this.axios({
          method: 'DELETE',
          url: `/project/deleteData/${id}`,
        })
        if (status !== 200) {
          throw new Error('Error al eliminar el proyecto')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async clickProject(e) {
      if (e.target.tagName === 'BUTTON') {
        const { action, index } = e.target.dataset
        if (action === 'edit') {
          this.changeModal({
            show: true,
            dataEdit: this.list[index],
          })
        } else {
          const infoAlert = {
            resourceName: alertResourcesName.project,
            action: alertActions.delete,
          }
          const confirm = await confirmMessageModal(infoAlert)
          if (confirm) {
            loadingMessageModal(infoAlert)
            const project = this.list.filter(
              (_, ind) => ind === parseInt(index),
            )
            const id = project[0]._id
            const status = await this.deleteProject(id)
            showMessageModal({ ...infoAlert, status })
            if (status) {
              getDataList(getActions.getProjects)
            }
          }
        }
      }
    },
  },
}
</script>
