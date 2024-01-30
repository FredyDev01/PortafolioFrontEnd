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
      class="min-w-full MdSm:min-w-min MdSm:max-w-VwModel2 h-full MdSm:h-fit MdSm:max-h-88vh m-0 MdSm:m-auto bg-white dark:bg-gray-700 rounded-none MdSm:rounded-md fixed inset-0 flex flex-col z-50 duration-300"
    >
      <header
        class="p-6 border-b border-gray-300 dark:border-gray-600 relative"
      >
        <h1 class="text-Prt120 dark:text-white font-bold font-Poppins text-lg">
          {{ edit ? 'Act.' : 'Reg.' }} Proyectos:
        </h1>
        <i
          class="fas fa-times absolute top-4 right-4 cursor-pointer text-gray-300 dark:text-gray-600 transition duration-500 hover:text-gray-400 dark:hover:text-gray-500"
          @click="$emit('close')"
        />
      </header>
      <form
        class="flex-auto flex flex-col overflow-hidden"
        v-on:submit.prevent="processForm()"
      >
        <section
          class="flex-auto px-7 MdSm:px-6 py-8 overflow-y-scroll scroll"
          :class="[theme == 'light' ? 'scrollLight' : 'scrollDark']"
        >
          <div
            class="grid grid-cols-2 gap-x-8 gap-y-7 text-black dark:text-white font-sans text-xs 3sm:text-2xs"
          >
            <div
              class="col-span-2 h-44 p-5 border-dashed border-2 border-Prt50 dark:border-Prt200 rounded-lg"
            >
              <div
                v-show="!editImage && !previewImage"
                class="elementsCenter w-full h-full"
              >
                <i
                  class="fas fa-cloud-upload-alt text-Prt50 dark:text-Prt200 text-5xl"
                />
                <span
                  class="px-4 mt-3 text-Prt100 dark:text-Prt170 font-light font-Josefin text-center text-xs 3sm:text-sm"
                >
                  Estamos a la espera de cargar la imagen seleccionada
                </span>
              </div>
              <img
                v-show="editImage || previewImage"
                alt="imagePreview"
                class="imageAdapted"
                :src="previewImage ? previewImage : editImage"
              />
            </div>
            <div class="col-span-2">
              <label
                class="p-2 bg-gray-100 dark:bg-Prt250 transition duration-200 hover:bg-white dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-Prt230 hover:border-indigo-400 dark:hover:border-emerald-700 rounded-md cursor-pointer relative text-Prt100 dark:text-Prt170 hover:text-indigo-400 dark:hover:text-emerald-600"
              >
                <span class="text-xs">
                  <i class="far fa-image mr-1" />
                  Subir imagen
                </span>
                <input
                  accept=".jpg,.png,.gif,.jfif"
                  class="absolute inset-0 -z-20"
                  v-bind:required="!edit"
                  type="file"
                  @change="uploadImage($event)"
                />
              </label>
            </div>
            <div
              class="col-span-2 1/2sm:col-span-1 mt-7 relative text-xs 3sm:text-2xs verticalCenter"
            >
              <i
                class="far fa-file-alt absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.title"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Nombre del proyecto"
                required
                type="text"
              />
            </div>
            <div
              class="col-span-2 1/2sm:col-span-1 mt-8 relative text-xs 3sm:text-2xs verticalCenter"
            >
              <i
                class="absolute left-3 fas fa-mobile-alt pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <select
                v-model="dataForm.type"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md appearance-none text-Prt100 dark:text-Prt170"
                required
              >
                <option value="">Tipo de proyecto</option>
                <option value="Proyecto web">Proyecto web</option>
                <option value="Aplicacion movil">Aplicacion movil</option>
                <option value="Programa de pc">Programa de PC</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-3 pointer-events-none text-Prt100 dark:text-Prt170 text-xxs"
              />
            </div>
            <div
              class="col-span-2 1/2sm:col-span-1 mt-6 relative text-xs 3sm:text-2xs verticalCenter"
            >
              <i
                class="absolute fas fa-external-link-alt left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.seeProject"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Url del proyecto"
                required
                type="url"
              />
            </div>
            <div
              class="col-span-2 1/2sm:col-span-1 mt-6 relative flex items-center text-xs 3sm:text-2xs verticalCenter"
            >
              <i
                class="far fa-file-code absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.seeCode"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Codigo del proyecto"
                required
                type="url"
              />
            </div>
            <div class="col-span-2 mt-6">
              <div
                v-show="loading"
                class="w-max p-2 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 rounded-1/2md text-Prt100 dark:text-Prt170 font-medium text-xs 3sm:text-2xs"
              >
                Espere...
              </div>
              <div
                v-show="!loading && !list.length"
                class="p-2 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 rounded-1/2md text-Prt100 dark:text-Prt170 font-medium text-xs 3sm:text-2xs"
              >
                No hay tecnologias disponibles!
              </div>
              <Splide
                v-show="!loading && list.length"
                ref="splide"
                class="flex-auto overflow-hidden"
                :options="settings"
                @click="clickKnowledge($event)"
              >
                <SplideSlide
                  v-for="(knowledge, index) in list"
                  :key="knowledge._id"
                >
                  <div
                    class="p-2 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 rounded-1/2md flex justify-center items-center cursor-pointer text-Prt100 dark:text-Prt170 font-medium text-xs 3sm:text-2xs"
                    :data-index="index"
                  >
                    <input
                      :checked="
                        dataForm.technologies.indexOf(knowledge.title) !== -1
                      "
                      class="mr-2.5 pointer-events-none listTecnologies"
                      :class="[theme == 'light' ? 'checkLight' : 'checkDark']"
                      :required="!dataForm.technologies.length"
                      type="checkbox"
                    />
                    {{ knowledge.title }}
                  </div>
                </SplideSlide>
              </Splide>
            </div>
            <div class="col-span-2 mt-6 relative text-xs 3sm:text-2xs">
              <i
                class="fas fa-check-double absolute top-4 left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <textarea
                v-model="dataForm.functionality"
                class="w-full min-h-110 max-h-150 pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Finalidad del proyecto"
                required
              ></textarea>
            </div>
            <div class="col-span-2 mt-6 relative text-xs 3sm:text-2xs">
              <i
                class="fas fa-walking absolute top-4 left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <textarea
                v-model="dataForm.resume"
                class="w-full min-h-110 max-h-150 pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Realizacion del proyecto"
                required
              ></textarea>
            </div>
          </div>
        </section>
        <footer
          class="w-full px-6 py-7 border-t border-gray-300 dark:border-gray-600 text-white font-Maven text-xs"
        >
          <button
            class="px-3 py-2.5 mr-3 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-md"
            :disabled="!loading && !list.length"
            type="submit"
          >
            <i class="fas fa-save pr-2" />
            {{ edit ? 'Actualizar' : 'Registrar' }}
          </button>
          <button
            class="px-3 py-2.5 bg-red-500 transition duration-300 hover:bg-red-600 rounded-md"
            type="button"
            @click="$emit('close')"
          >
            <i class="fas fa-ban pr-1" />
            Cacenlar
          </button>
        </footer>
      </form>
    </div>
  </transition>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { mapState } from 'vuex'

import {
  pages,
  sections,
  alertResourcesName,
  alertActions,
  getActions,
} from '@/enum/index'
import { showMessageModal, loadingMessageModal } from '@/utils/alertsPanel'
import { getFormData } from '@/utils/forms'
import { getDataList } from '@/utils/getData'
import '@splidejs/vue-splide/css'

export default {
  name: 'CmpForm',
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    dataEdit: { type: Object, default: null },
    show: { type: Boolean, default: false },
  },
  emits: ['close'],
  data() {
    return {
      edit: null,
      editImage: null,
      previewImage: null,
      dataForm: {
        image: null,
        title: '',
        functionality: '',
        seeProject: '',
        seeCode: '',
        resume: '',
        type: '',
        technologies: [],
      },
      settings: {
        focus: 'center',
        autoWidth: true,
        pagination: false,
        gap: '1.2rem',
        destroy: false,
        classes: { arrows: 'hidden' },
      },
      sections,
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      modal: (state) => state.panel.modal,
      list: (state) => state.portfolio.knowledge.list,
      loading: (state) => state.portfolio.knowledge.loading,
    }),
  },
  watch: {
    show: {
      handler() {
        this.setDataValue()
        if (this.show && !this.list.length) {
          getDataList(getActions.getKnowledges, pages.portfolio)
        }
      },
      deep: true,
    },
  },
  methods: {
    setDataValue() {
      setTimeout(
        () => {
          const {
            _id,
            urlImage,
            title,
            functionality,
            seeProject,
            seeCode,
            resume,
            description,
            level,
            type,
            technologies,
          } = this.dataEdit ?? {}
          this.edit = _id ?? null
          this.editImage = urlImage ?? ''
          this.previewImage = null
          this.dataForm.title = title ?? ''
          this.dataForm.functionality = functionality ?? ''
          this.dataForm.seeProject = seeProject ?? ''
          this.dataForm.seeCode = seeCode ?? ''
          this.dataForm.resume = resume ?? ''
          this.dataForm.description = description ?? ''
          this.dataForm.level = level ?? ''
          this.dataForm.type = type ?? ''
          this.dataForm.technologies = technologies ?? []
        },
        this.show ? 0 : 500,
      )
    },
    uploadImage(e) {
      const image = e.target.files[0]
      this.previewImage = image ? URL.createObjectURL(image) : null
      this.dataForm.image = image
    },
    clickKnowledge(e) {
      const { index } = e.target.dataset
      if (index) {
        const knowledge = this.list.filter((_, ind) => ind === parseInt(index))
        const technology = knowledge[0].title
        const indTechnology = this.dataForm.technologies.indexOf(technology)
        if (indTechnology === -1) {
          this.dataForm.technologies.push(technology)
        } else {
          this.dataForm.technologies.splice(indTechnology, 1)
        }
      }
    },
    async editProject(project) {
      try {
        const { status } = await this.axios({
          method: 'PUT',
          url: `/project/editData/${this.edit}`,
          data: project,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al editar el proyecto')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async createProject(project) {
      try {
        const { status } = await this.axios({
          method: 'POST',
          url: '/project/newData',
          data: project,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al guardar el proyecto')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async processForm() {
      const project = getFormData(this.dataForm)
      const resourceName = alertResourcesName.project
      let status = false
      this.$emit('close')
      if (this.edit) {
        const dataAlert = { resourceName, action: alertActions.edit }
        loadingMessageModal(dataAlert)
        status = await this.editProject(project)
        showMessageModal({ ...dataAlert, status })
      } else {
        const dataAlert = { resourceName, action: alertActions.create }
        loadingMessageModal(dataAlert)
        status = await this.createProject(project)
        showMessageModal({ ...dataAlert, status })
      }
      if (status) {
        getDataList(getActions.getProjects)
      }
    },
  },
}
</script>

<style scoped>
.listTecnologies::before {
  content: '';
  width: 15px;
  height: 15px;
  border: 2px double rgb(69, 78, 92);
  cursor: pointer;
  vertical-align: top;
  display: inline-block;
}
.listTecnologies:checked::before {
  content: '✓';
  font-size: 10px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkLight::before {
  border: 1.5px double rgb(193, 199, 210);
  background: white;
}
.checkDark::before {
  border: 1.5px double rgb(93 99 110);
  background: rgb(60 70 86);
}
.checkLight:checked::before {
  border: 1.4px double #6366f1;
  background: #6366f1;
}
.checkDark:checked::before {
  border: 1.4px double #059669;
  background: #059669;
}
</style>
