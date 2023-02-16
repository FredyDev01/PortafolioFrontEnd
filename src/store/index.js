import { createStore } from 'vuex'
import StorePanel from './StorePanel'
import router from '@/router'
import Swal from 'sweetalert2'
import axios from 'axios'


export default createStore({  
    modules: {StorePanel},    

    state: {
        SeccActual: 'Inicio',
        Theme: 'light',
        RefreshToken: null,
        Jwt: {Token: null, ExpireIn: null}                                        
    },

    mutations: {
        /*---------MENSAJES PARA EL USUARIO---------*/
        LoadingAlert(state, datos){
            Swal.fire({
                title: datos.tlt,
                html: `                       
                <div class="flex justify-center items-center mx-auto"><span class="loader text-indigo-500 dark:text-emerald-600"></span></div>
                <p class="text-sm mt-5" style="margin-bottom: 10px">${datos.msg}</p>                        
                `, 
                showConfirmButton: false
            })     
        }, 
        ShowMessage(state, datos){
            Swal.fire({
                icon: datos.Err ? 'error' : 'success',
                title: datos.tlt,
                html: `<p class="text-sm">${datos.msg}</p>`
            })
        }, 
        /*---------METODOS PARA EL BODY---------*/
        HiddenBody(state, Estado){
            var ListToggle = ''                                              
            if(Estado !== false){
                ListToggle +=  'overflow-hidden w-screen h-screen'                
                if(window.innerWidth < 810) ListToggle += ' 1md:overflow-auto 1md:w-auto 1md:h-auto'                
            }            
            document.body.className = ListToggle
        },    
        /*---------METODOS SETTERS---------*/
        SetTheme(state, data){            
            state.Theme = data
            document.documentElement.classList = data                        
        },
        SetRefreshToken(state, data){
            state.RefreshToken = data || null
        },
        SetJwt(state, data){
            state.Jwt.Token = data.token || null
            state.Jwt.ExpireIn = data.expiresIn || null
        },
        SetSeccion(state, scc){
            state.SeccActual = scc != '' ? scc : 'Inicio'
        }  
    },

    actions: {
        /*---------CAMBIOS DE THEME Y VERIFICACION---------*/
        ChangeTheme({state, commit}){
            const NewTheme = state.Theme == 'dark' ? 'light' : 'dark'                        
            localStorage.setItem('Theme', NewTheme)            
            commit('SetTheme', NewTheme)
        },
        GetTheme({commit}){
            const ThemeAct = localStorage.getItem('Theme') || 'light'
            commit('SetTheme', ThemeAct)
        },
        async VrfData({commit, dispatch}){                    
            const PathName = window.location.pathname.replace('/', '')                                                 
            const RefreshToken = localStorage.getItem('RefreshToken') || null
            commit('SetSeccion', PathName)                                  
            if(RefreshToken){
                commit('SetRefreshToken', RefreshToken)
                await dispatch('GenerateToken')
            }                        
        },
        /*---------ACCIONES PARA EL TOKEN---------*/
        async GenerateToken({state, commit, dispatch}){
            try{
                const Consult = await axios({url: '/Auth/GetToken', method: 'GET', headers: {'RefreshToken': state.RefreshToken}})
                commit('SetJwt', {token: Consult.data.token, expiresIn: Consult.data.expiresIn})
                dispatch('ReloadToken')
            }catch(err){
                console.log(err)
                dispatch('DeleteToken')                
            }
        },
        ReloadToken({state, dispatch}){            
            this.GetToken = setTimeout(()=> {
                dispatch('GenerateToken')
            }, (state.Jwt.ExpireIn * 1000) - 60000)
        },
        async DeleteToken({commit}){           
            localStorage.removeItem('RefreshToken')
            clearTimeout(this.GetToken)
            commit('SetRefreshToken')                
            commit('SetJwt', {})
            commit('SetSeccion', 'Inicio')
            router.push({name: 'Prt_Inicio'})            
        },
        /*---------INICIO DE SESION---------*/
        async LoginAdmin({commit, dispatch}, Content){
            commit('LoadingAlert', {
                tlt: 'Logueando usuario',
                msg: `Espere hasta que validemos los datos ingresados 
                en el formulario, esto puede tardar algunos segundos.`
            })                                 
            try{
                const Consult = await axios({url: '/Auth/Login', method: 'POST', data: Content, headers: {'Content-Type': 'application/json'}})                                
                if(Consult.status === 200){                    
                    localStorage.setItem('RefreshToken', Consult.data.refreshToken)
                    commit('SetRefreshToken', Consult.data.refreshToken)
                    await dispatch('GenerateToken')                    
                    commit('SetSeccion', 'Inicio')
                    router.push({name: 'Prt_Inicio'})
                    Swal.close()                    
                }
            }catch(err){
                console.log(err)
                commit('ShowMessage', {
                    Err: true,
                    tlt: 'Usuario invalido',
                    msg: `Al parecer el email o el password ingrezados 
                    no son correctos, le recomendamos volver a intentarlo.`
                })                
            }                                                                                              
        }
    }
})