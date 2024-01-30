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
        <h1
          class="text-Prt120 dark:text-gray-200 font-bold font-Poppins text-lg"
        >
          {{ edit ? 'Act.' : 'Reg.' }} Conocmientos:
        </h1>
        <i
          class="absolute top-4 right-4 fas fa-times cursor-pointer text-gray-300 dark:text-gray-600 transition duration-500 hover:text-gray-400 dark:hover:text-gray-500"
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
            class="grid grid-cols-2 gap-x-6 gap-y-7 text-black dark:text-white font-sans text-xs 3sm:text-2xs"
          >
            <div
              class="col-span-2 h-44 p-5 border-dashed border-2 border-Prt50 dark:border-Prt200 rounded-lg"
            >
              <div
                v-show="!editImage && !previewImage"
                class="w-full h-full elementsCenter"
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
                class="far fa-file-code absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.title"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Ingrese la tecnologia"
                required
                type="text"
              />
            </div>
            <div
              class="col-span-2 1/2sm:col-span-1 mt-7 relative text-xs 3sm:text-2xs verticalCenter"
            >
              <i
                class="far fa-star-half absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <select
                v-model="dataForm.level"
                class="w-full pl-8 pr-10 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md appearance-none text-Prt100 dark:text-Prt170"
                required
              >
                <option value="">Ingrese el nivel</option>
                <option value="Regular">Regular</option>
                <option value="Medio">Medio</option>
                <option value="Basico">Basico</option>
              </select>
              <i
                class="fa-solid fa-chevron-down absolute right-3.5 pointer-events-none text-Prt100 dark:text-Prt170 text-xxs"
              />
            </div>
            <div class="col-span-2 mt-5 relative flex text-xs 3sm:text-2xs">
              <i
                class="fas fa-code-branch absolute top-4 left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <textarea
                v-model="dataForm.resume"
                class="w-full min-h-110 max-h-150 pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Resumen de la tecnologia"
                required
              />
            </div>
            <div class="col-span-2 mt-5 relative flex text-xs 3sm:text-2xs">
              <i
                class="fas fa-stream absolute top-4 left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <textarea
                v-model="dataForm.description"
                class="w-full min-h-110 max-h-150 pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Descripcion de tus conocimientos"
                required
              />
            </div>
          </div>
        </section>
        <footer
          class="w-full px-6 py-6 MdSm:py-7 border-t border-gray-300 dark:border-gray-600 text-white font-Maven text-xs"
        >
          <button
            class="px-3 py-2.5 mr-3 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-md"
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
            Cancelar
          </button>
        </footer>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import { sections, alertResourcesName, alertActions, getActions } from '@/enum'
import { showMessageModal, loadingMessageModal } from '@/utils/alertsPanel'
import { getFormData } from '@/utils/forms'
import { getDataList } from '@/utils/getData'

export default {
  name: 'CmpForm',
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
        resume: '',
        description: '',
        level: '',
      },
      sections,
    }
  },
  computed: {
    ...mapState(['theme']),
  },
  watch: {
    show: {
      handler() {
        this.setDataValue()
      },
      deep: true,
    },
  },
  methods: {
    setDataValue() {
      setTimeout(
        () => {
          const { _id, urlImage, title, resume, description, level } =
            this.dataEdit ?? {}
          this.edit = _id ?? null
          this.editImage = urlImage ?? ''
          this.previewImage = null
          this.dataForm.title = title ?? ''
          this.dataForm.resume = resume ?? ''
          this.dataForm.description = description ?? ''
          this.dataForm.level = level ?? ''
        },
        this.show ? 0 : 500,
      )
    },
    async uploadImage(e) {
      const image = e.target.files[0]
      this.previewImage = image ? URL.createObjectURL(image) : null
      this.dataForm.image = image
    },
    async editKnowledge(knowledge) {
      try {
        const { status } = await this.axios({
          method: 'PUT',
          url: `/knowledge/editData/${this.edit}`,
          data: knowledge,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al editar el conocimiento')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async createKnowledge(knowledge) {
      try {
        const { status } = await this.axios({
          method: 'POST',
          url: '/knowledge/newData',
          data: knowledge,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al guardar el conocimiento')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async processForm() {
      const knowledge = getFormData(this.dataForm)
      const resourceName = alertResourcesName.knowledge
      let status = false
      this.$emit('close')
      if (this.edit) {
        const dataAlert = { resourceName, action: alertActions.edit }
        loadingMessageModal(dataAlert)
        status = await this.editKnowledge(knowledge)
        showMessageModal({ ...dataAlert, status })
      } else {
        const dataAlert = { resourceName, action: alertActions.create }
        loadingMessageModal(dataAlert)
        status = await this.createKnowledge(knowledge)
        showMessageModal({ ...dataAlert, status })
      }
      if (status) {
        getDataList(getActions.getKnowledges)
      }
    },
  },
}
</script>
