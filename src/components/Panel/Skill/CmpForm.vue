<template>
  <transition
    enterActiveClass="animated fadeIn"
    leaveActiveClass="animated fadeOut"
  >
    <main
      v-show="show"
      class="w-full h-full fixed inset-0 bg-backdrop transition z-40 duration-300"
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
      <div class="p-6 border-b border-gray-300 dark:border-gray-600 relative">
        <h1
          class="text-Prt120 dark:text-gray-200 font-bold font-Poppins text-lg"
        >
          Reg. Habilidades:
        </h1>
        <i
          class="absolute top-4 right-4 fas fa-times cursor-pointer text-gray-300 dark:text-gray-600 transition duration-500 hover:text-gray-500 dark:hover:text-gray-500"
          @click="$emit('close')"
        />
      </div>
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
            <div class="col-span-2 1/2sm:col-span-1 relative verticalCenter">
              <i
                class="far fa-clipboard absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.title"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                placeholder="Ingrese su habilidad"
                required
                type="text"
              />
            </div>
            <div class="col-span-2 1/2sm:col-span-1 relative verticalCenter">
              <i
                class="fas fa-percent absolute left-3 pointer-events-none text-Prt100 dark:text-Prt170"
              />
              <input
                v-model="dataForm.percentage"
                class="w-full pl-8 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
                max="100"
                min="0"
                placeholder="Ingrese su porcentaje"
                required
                type="number"
              />
            </div>
          </div>
        </section>
        <div
          class="w-full px-6 py-7 border-t border-gray-300 dark:border-gray-600 text-white font-Maven text-xs"
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
            Cacenlar
          </button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import { alertResourcesName, alertActions, getActions } from '@/enum/index'
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
      dataForm: {
        title: '',
        percentage: '',
      },
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
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
          const { _id, title, percentage } = this.dataEdit ?? {}
          this.edit = _id ?? null
          this.dataForm.title = title ?? ''
          this.dataForm.percentage = percentage ?? ''
        },
        this.show ? 0 : 500,
      )
    },
    async editSkill(skill) {
      try {
        const { status } = await this.axios({
          method: 'PUT',
          url: `/skill/editData/${this.edit}`,
          data: skill,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al editar la habilidad')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async createSkill(skill) {
      try {
        const { status } = await this.axios({
          method: 'POST',
          url: '/skill/newData',
          data: skill,
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (status !== 200) {
          throw new Error('Error al guardar la habilidad')
        }
        return true
      } catch (err) {
        return false
      }
    },
    async processForm() {
      const skill = getFormData(this.dataForm)
      const resourceName = alertResourcesName.skill
      let status = false
      this.$emit('close')
      if (this.edit) {
        const dataAlert = { resourceName, action: alertActions.edit }
        loadingMessageModal(dataAlert)
        status = await this.editSkill(skill)
        showMessageModal({ ...dataAlert, status })
      } else {
        const dataAlert = { resourceName, action: alertActions.create }
        loadingMessageModal(dataAlert)
        status = await this.createSkill(skill)
        showMessageModal({ ...dataAlert, status })
      }
      if (status) {
        getDataList(getActions.getSkills)
      }
    },
  },
}
</script>
