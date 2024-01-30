<template>
  <div class="w-full flex flex-col 3sm:flex-row">
    <form
      ref="form"
      class="w-full 3sm:w-p/2/4 pt-12 pb-24 3sm:pb-12 px-8 1/2sm:px-12 bg-white dark:bg-gray-700"
      @submit.prevent="SendMessage($event)"
    >
      <h1
        class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl"
      >
        Contactame
        <hr
          class="w-1/3 mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"
        />
      </h1>
      <div
        class="my-13 MdSm:my-16 grid grid-cols-2 gap-x-10 gap-y-9 MnSm:gap-y-12 text-black dark:text-white font-sans text-2xs"
      >
        <div
          class="col-span-2 MnSm:col-span-1 mt-4 relative flex justify-start items-center"
        >
          <i class="absolute left-3 far fa-user text-Prt100 dark:text-Prt170" />
          <input
            v-model="dataForm.name"
            class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
            name="mrom_name"
            placeholder="Ingrese su nombre"
            requiredc
            type="text"
          />
        </div>
        <div
          class="col-span-2 MnSm:col-span-1 mt-4 relative flex justify-start items-center"
        >
          <i class="absolute left-3 fas fa-at text-Prt100 dark:text-Prt170" />
          <input
            v-model="dataForm.email"
            class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170"
            name="reply_to"
            placeholder="Ingrese su correo"
            required
            type="email"
          />
        </div>
        <div class="col-span-2 mt-4 relative">
          <i
            class="absolute top-4 left-3 far fa-comment text-Prt100 dark:text-Prt170"
          />
          <textarea
            v-model="dataForm.message"
            class="w-full min-h-200 max-h-240 pl-9 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170 text-black dark:text-white"
            name="message"
            placeholder="Ingrese el mensaje que desea enviar a Fredy"
            required
          />
        </div>
      </div>
      <button
        class="w-full MnXs:w-auto px-5 py-3.5 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-lg MnXs:rounded-full text-white font-Maven text-xs"
        type="submit"
      >
        Enviar mensaje
        <i class="fa-solid fa-inbox ml-2" />
      </button>
    </form>

    <div
      class="w-full 3sm:w-p/1/4 px-10 pt-8 3sm:pt-12 pb-12 relative bg-gray-100 dark:bg-Prt270 flex justify-center 3sm:justify-start items-center flex-col MdSm:flex-row-reverse 3sm:flex-col"
    >
      <div
        class="w-full h-12 absolute -top-12 overflow-hidden block 3sm:hidden"
      >
        <IlusEffectOla />
      </div>
      <IlusContact />
      <div
        class="w-52 1/3md:w-2/5 3sm:w-full mr-0 MdSm:mr-7 1/3md:mr-10 3sm:mr-0"
      >
        <h3
          class="mb-5 hidden MdSm:block 3sm:hidden text-gray-500 dark:text-white text-center font-bold text-2xs 1md:text-sm"
        >
          Otros medios de contacto:
        </h3>
        <p
          class="pt-0 3sm:pt-7 text-gray-500 dark:text-gray-300 font-sans text-2xs 1/2lg:text-sm text-center"
        >
          En caso desees
          <strong class="text-gray-500 dark:text-white 3sm:font-bold">
            contactarme de forma mas rapida
          </strong>
          , puedes acceder a alguno de estos enlaces y respodere a tus mensajes
          lo mas rapido posible.
        </p>
        <div class="pt-2 3sm:pt-4 flex flex-wrap justify-center items-center">
          <a
            class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"
            href="https://www.linkedin.com/in/fredy-nemesio-palomino-huamani-a7139a26b"
            target="_blank"
          >
            <i class="fab fa-linkedin" />
          </a>
          <a
            class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"
            href="https://wa.me/994010146"
            target="_blank"
          >
            <i class="fab fa-whatsapp" />
          </a>
          <a
            class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"
            href="mailto:fredy12cbpu@gmail.com"
          >
            <i class="fas fa-envelope" />
          </a>
          <a
            class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"
            href="https://www.facebook.com/profile.php?id=61554913421430"
            target="_blank"
          >
            <i class="fab fa-facebook" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com'

import IlusContact from '@/components/Illustrations/IlusContact.vue'
import IlusEffectOla from '@/components/Illustrations/IlusEffectOla.vue'
import { showMessage, loadingMessage } from '@/utils/alerts'

export default {
  name: 'ViewContact',
  components: { IlusContact, IlusEffectOla },
  data() {
    return {
      dataForm: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    SendMessage(i) {
      loadingMessage({
        tlt: 'Enviando correo',
        msg: 'Estamos enviando su mensaje a mi respectivo correo, esto puede tardar algunos momentos.',
      })
      emailjs
        .sendForm(
          'service_vcwadyc',
          'template_n1nivhd',
          i.target,
          'dkrcVNCtfz6YFpCP0',
        )
        .then(() => {
          showMessage({
            tlt: 'Mensaje enviado',
            msg: 'Su mensaje fue enviado con exito',
          })
          this.dataForm.name = ''
          this.dataForm.email = ''
          this.dataForm.message = ''
        })
        .catch(() => {
          showMessage({
            err: true,
            tlt: 'Error al enviar',
            msg: 'Al parecer no se pudo enviar el correo',
          })
        })
    },
  },
}
</script>
