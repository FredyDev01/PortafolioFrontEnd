<template>
    <div class="w-full flex flex-col 3sm:flex-row">        
        <form @submit.prevent="SendMessage($event)" ref="form" class="w-full 3sm:w-p/2/4 pt-12 pb-24 3sm:pb-12 px-8 1/2sm:px-12 bg-white dark:bg-gray-700">                                
            <h1 class="table text-gray-700 dark:text-white font-bold font-OpenSans text-xl 1/2lg:text-2xl">Contactame <hr class="w-1/3 mt-1 border-0 border-b-4 border-indigo-500 dark:border-emerald-600 rounded-full"></h1>                
                <div class="my-13 MdSm:my-16 grid grid-cols-2 gap-x-10 gap-y-9 MnSm:gap-y-12 text-black dark:text-white font-sans text-2xs">
                    <div class="col-span-2 MnSm:col-span-1 mt-4 relative flex justify-start items-center">                        
                        <i class="absolute left-3 far fa-user text-Prt100 dark:text-Prt170"></i>
                        <input v-model="Nombre" type="text" name="from_name" class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese su nombre" required>                        
                    </div>
                    <div class="col-span-2 MnSm:col-span-1 mt-4 relative flex justify-start items-center">                        
                        <i class="absolute left-3 fas fa-at text-Prt100 dark:text-Prt170"></i>
                        <input v-model="Correo" type="email" name="reply_to" class="w-full pl-9 pr-2 py-3.5 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170" placeholder="Ingrese su correo" required>
                    </div>
                    <div class="col-span-2 mt-4 relative">
                        <i class="absolute top-4 left-3 far fa-comment text-Prt100 dark:text-Prt170"></i>
                        <textarea v-model="Mensaje" name="message" class="w-full pl-9 pr-2 py-3 bg-gray-100 dark:bg-Prt250 border-2 border-gray-300 dark:border-Prt230 transition duration-300 focus:outline-none focus:border-indigo-400 dark:focus:border-emerald-700 rounded-md placeholder:text-Prt100 dark:placeholder:text-Prt170 text-black dark:text-white" style="min-height: 12.5rem; max-height: 14.5rem" placeholder="Ingrese el mensaje que desea enviar a Fredy" required></textarea>
                    </div>
                </div>                                    
            <button type="submit" class="w-full MnXs:w-auto px-5 py-3.5 bg-indigo-500 dark:bg-emerald-600 transition duration-300 hover:bg-indigo-600 dark:hover:bg-emerald-700 rounded-lg MnXs:rounded-full text-white font-Maven text-xs">Enviar mensaje <i class="fa-solid fa-inbox ml-2"></i></button>                               
        </form>

        <div class="w-full 3sm:w-p/1/4 px-10 pt-8 3sm:pt-12 pb-12 relative bg-gray-100 dark:bg-Prt270 flex justify-center 3sm:justify-start items-center flex-col MdSm:flex-row-reverse 3sm:flex-col">               
            <div class="w-full h-12 absolute -top-12 overflow-hidden block 3sm:hidden"><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%"><path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" class="fill-gray-100 dark:fill-Prt270" style="stroke: none;"></path></svg></div>
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-56 1/3md:w-60 3sm:w-full mb-6 MdSm:m-0 3sm:mx-auto" viewBox="0 0 863.91732 364.20537" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="311.959 119.745 0 119.745 0 222.156 11.817 222.156 11.817 248.941 38.601 222.156 311.959 222.156 311.959 119.745" class="fill-white dark:fill-gray-500"/><rect x="8.66553" y="129.71814" width="294.62811" height="81.92868" class="fill-white dark:fill-gray-500"/><rect x="34.72148" y="154.42552" width="141.85589" height="4.30497" class="fill-gray-400 dark:fill-white"/><rect x="34.72148" y="169.31777" width="247.24292" height="4.30497" class="fill-gray-400 dark:fill-white"/><rect x="34.72148" y="184.21003" width="247.00081" height="4.30497" class="fill-gray-400 dark:fill-white"/><path d="M692.07274,618.96676s1.487-31.15875,31.97119-27.537" transform="translate(-168.04134 -267.89732)" class="fill-gray-400 dark:fill-gray-500"/><circle cx="515.41796" cy="306.16087" r="15.2571" class="fill-gray-400 dark:fill-gray-500"/><rect x="512.9354" y="331.85294" width="4.30672" height="30.14703" class="fill-gray-400"/><circle cx="666.92952" cy="180.07338" r="123.29665" class="fill-gray-400 dark:fill-gray-800"/><path d="M757.348,457.86815a32.62688,32.62688,0,0,1,50.081,0,36.26372,36.26372,0,1,0-51.27085-1.18987Q756.73918,457.28694,757.348,457.86815Z" transform="translate(-168.04134 -267.89732)" fill="#fff"/><path d="M855.26,457.86815a32.627,32.627,0,0,1,50.08092,0,36.26371,36.26371,0,1,0-51.2708-1.18987Q854.65117,457.28694,855.26,457.86815Z" transform="translate(-168.04134 -267.89732)" fill="#fff"/><circle cx="601.97649" cy="151.39215" r="12.47434" class="fill-gray-500 dark:fill-gray-800"/><circle cx="699.88499" cy="151.39215" r="12.47434" class="fill-gray-500 dark:fill-gray-800"/><circle cx="578.08341" cy="210.89752" r="14.50548" class="fill-gray-300 dark:fill-gray-500"/><circle cx="744.8965" cy="210.89752" r="14.5055" class="fill-gray-300 dark:fill-gray-500"/><polygon points="661.49 181.886 650.611 229.029 668.742 210.898 661.49 181.886" class="fill-gray-300 dark:fill-gray-500"/><polygon points="717.39 363.205 705.038 352.839 705.326 363.205 701.49 363.205 701.183 352.244 684.507 363.205 677.526 363.205 701.059 347.737 700.147 315.258 699.466 290.728 703.293 290.623 703.984 315.258 704.894 347.708 723.354 363.205 717.39 363.205" class="fill-gray-500 dark:fill-gray-800"/><polygon points="659.363 363.205 647.012 352.839 647.3 363.205 643.474 363.205 643.167 352.244 626.49 363.205 619.509 363.205 643.033 347.737 642.122 315.258 641.441 290.728 645.276 290.623 645.967 315.258 646.868 347.708 665.328 363.205 659.363 363.205" class="fill-gray-500 dark:fill-gray-800"/><path d="M836.784,315.60813c-3.3831,0-6.36764,2.628-8.36294,6.66445-1.75872-6.06969-5.45374-10.29078-9.7689-10.29078a6.56326,6.56326,0,0,0-.87094.1463c-1.65871-6.4805-5.51368-11.02542-10.00816-11.02542-6.00841,0-10.8791,8.118-10.8791,18.13187s4.87073,18.13187,10.8791,18.13187a6.56119,6.56119,0,0,0,.87093-.14629c1.65871,6.4805,5.51369,11.02541,10.00817,11.02541,3.3831,0,6.36764-2.62795,8.36294-6.66444,1.75876,6.06971,5.45374,10.29077,9.7689,10.29077,6.00841,0,10.8791-8.118,10.8791-18.13187S842.79244,315.60813,836.784,315.60813Z" transform="translate(-168.04134 -267.89732)" class="fill-gray-400 dark:fill-gray-800"/><path d="M718.72328,451.807l-67.92039-11.01653c-3.42269-.55515-6.90789-1.11141-10.34147-.6282s-6.87069,2.1737-8.62107,5.16688a8.651,8.651,0,0,0,9.14985,12.853c-3.70741-.12023-7.60411-.19978-10.894,1.51369s-5.61946,5.87559-4.01553,9.22024a8.27667,8.27667,0,0,0,1.91922,2.4289,17.60582,17.60582,0,0,0,18.52289,3.14128c-2.50047,3.58582-7.46212,4.11838-11.7541,4.94866s-9.25362,3.258-9.41312,7.62664c-.17922,4.90869,5.66264,7.51763,10.47189,8.51687A137.41687,137.41687,0,0,0,712.648,489.3171a30.98,30.98,0,0,0,7.737-3.95049,17.43266,17.43266,0,0,0-7.05356-30.96345" transform="translate(-168.04134 -267.89732)" class="fill-gray-400 dark:fill-gray-800"/><path d="M1011.89005,507.47917a137.41884,137.41884,0,0,0-51.17256-57.63676,30.97519,30.97519,0,0,0-7.80737-3.80966,17.43272,17.43272,0,0,0-20.50879,24.24615l-5.31525-2.74921Q943.09323,497.98314,959.1,528.43656c1.61312,3.06929,3.26318,6.18918,5.71292,8.64309s5.86648,4.18514,9.31075,3.78525a8.6006,8.6006,0,0,0,6.77916-12.2999,16.64264,16.64264,0,0,0,5.752,5.05979c3.34648,1.59972,8.07321.9603,9.7823-2.33177a8.27455,8.27455,0,0,0,.78809-2.99368,17.60592,17.60592,0,0,0-8.62117-16.69248c4.36853-.1565,7.77622,3.48909,11.01912,6.42052,3.24327,2.93143,8.1652,5.43808,11.75289,2.94008C1015.40712,518.16062,1013.98161,511.92354,1011.89005,507.47917Z" transform="translate(-168.04134 -267.89732)" class="fill-gray-400 dark:fill-gray-800"/><polygon points="55.757 0 506 0 506 147.807 488.945 147.807 488.945 186.463 450.289 147.807 55.757 147.807 55.757 0" class="fill-white dark:fill-gray-500"/><rect x="68.26381" y="14.39335" width="425.22943" height="118.24561" class="fill-white dark:fill-gray-500"/><rect x="102.45877" y="48.91591" width="204.73707" height="6.21326" class="fill-gray-400 dark:fill-white"/><rect x="102.45877" y="70.40954" width="356.83952" height="6.21326" class="fill-gray-400 dark:fill-white"/><rect x="102.45877" y="91.90316" width="356.49009" height="6.21326" class="fill-gray-400 dark:fill-white"/><path d="M1030.95866,632.10268h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-168.04134 -267.89732)" class="fill-gray-600 dark:fill-gray-400"/></svg>                      
            <div class="w-52 1/3md:w-2/5 3sm:w-full mr-0 MdSm:mr-7 1/3md:mr-10 3sm:mr-0">
                <h3 class="mb-5 hidden MdSm:block 3sm:hidden text-gray-500 dark:text-white text-center font-bold text-2xs 1md:text-sm">Otros medios de contacto:</h3>
                <p class="pt-0 3sm:pt-7 text-gray-500 dark:text-gray-300 font-sans text-2xs 1/2lg:text-sm text-center">
                    En caso desees <strong class="text-gray-500 dark:text-white 3sm:font-bold">contactarme de forma mas rapida</strong>, 
                    puedes acceder a alguno de estos enlaces y respodere a tus mensajes lo mas rapido posible.
                </p>                
                <div class="pt-2 3sm:pt-4 flex flex-wrap justify-center items-center">
                    <a href="https://www.linkedin.com/in/fredy-nemesio-palomino-huamani-7b6372216" target="_blank" class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"><i class="fab fa-linkedin"></i></a>
                    <a href="https://wa.me/994010146" target="_blank" class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"><i class="fab fa-whatsapp"></i></a>
                    <a href="mailto:fredy12cvpu@gmail.com" class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"><i class="fas fa-envelope"></i></a>
                    <a href="https://www.facebook.com/fredy.crak.16/" target="_blank" class="w-8 h-8 1/3md:w-9 1/3md:h-9 3sm:h-8 3sm:w-8 1/2lg:h-10 1/2lg:w-10 mx-2 mt-3 bg-indigo-500 dark:bg-emerald-600 rounded-full transition duration-200 hover:bg-indigo-600 dark:hover:bg-emerald-700 flex justify-center items-center text-white text-xs 1/3md:text-sm 3sm:text-xs 1/2lg:text-sm"><i class="fab fa-facebook"></i></a>
                </div>
            </div>                        
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex'
import emailjs from 'emailjs-com'

export default{
    data(){
        return{
            Nombre: '',
            Correo: '',
            Mensaje: ''
        }
    },
    methods:{    
        ...mapMutations(['ShowMessage', 'LoadingAlert']),        
        SendMessage(i){    
            this.LoadingAlert({tlt: 'Enviando correo', msg: 'Estamos enviando su mensaje a mi respectivo correo, esto puede tardar algunos momentos.'})          
            emailjs.sendForm(
                'service_vcwadyc',                  
                'template_n1nivhd',
                i.target, 
                'dkrcVNCtfz6YFpCP0'
            ).then(()=>{           
                    this.ShowMessage({tlt: 'Mensaje enviado', msg: 'Su mensaje fue enviado con exito'})                             
                    this.Nombre = ''
                    this.Correo = ''
                    this.Mensaje = ''
                }).catch((err)=>{
                    console.log(err)
                    this.ShowMessage({Err: true, tlt: 'Error al enviar', msg: 'Al parecer no se pudo enviar el correo'})
                }
            )
        }
    }
}
</script>