import store from './index'
import Swal from 'sweetalert2'
import axios from 'axios'


export default {
  namespaced: true,
  
  state: {
    ShowSeccion: 'Conocimientos',
    DataFilt: {Busq: '', Ord: 1, Page: 1},
    MaxPage: 0,
    ShowModal: false,
    DataEdit: {}                          
  },

  mutations: {
    /*-------------METODOS SETTERS-------------*/    
    SetShowSeccion(state, date){
      state.ShowSeccion = date
    },
    SetDataEdit(state, data){
      state.DataEdit = data
    },
    SetMaxPage(state, Num){
      state.MaxPage = Num
    },
    SetShowModal(state){
      state.ShowModal = !state.ShowModal
    },
    SetDataFilt(state, data){
      if(data.Busq || data.Busq == '') state.DataFilt.Busq = data.Busq
      if(data.Ord) state.DataFilt.Ord = data.Ord
      if(data.Page) state.DataFilt.Page = data.Page
    }
  },
  
  actions: {
    /*------------ACCIONES DEL MODAL-----------*/
    OpenModal({state, commit}){
      commit('SetShowModal')      
      if(!state.ShowModal || state.ShowSeccion != 'Proyectos') store.commit('HiddenBody', state.ShowModal)      
      if(!state.ShowModal) commit('SetDataEdit', {})      
    },
    /*-------------PROCESAR IMAGENES-------------*/
    async GetBase64({}, e){    
      return await new Promise((resolve, reject)=> {
        const Image = e.target.files[0]  
        if(Image){
          const reader = new FileReader()            
          reader.readAsDataURL(Image)
          reader.onload =()=> resolve(reader.result)
          reader.onerror = reject
        }else resolve('')
      })          
    },         
    /*-----------DATOS PARA LA TABLA----------*/
    async Mostrar({state, commit}){                        
      try{          
        const Consult = await axios({url: `/${state.ShowSeccion}/GetData/0?Busq=${state.DataFilt.Busq}&Page=${state.DataFilt.Page}&Ord=${state.DataFilt.Ord}`, method: 'GET'})
        commit('SetMaxPage', Consult.data.MaxPage)
        return Consult.data.Datos          
      }catch(err){
        console.log(err)
        commit('SetMaxPage', 0)
        return []
      }
    },
    /*----------TECNOLOGIAS PARA EL MODAL----------*/
    async MostrarTec({state}){      
      if(!Object.keys(state.DataEdit).length){
        store.commit('LoadingAlert', {
          tlt: 'Obteniendo datos', 
          msg: `Estamos en el proceso de obtener los conocimientos, 
          para poder abrir el modal con todos los datos necesarios.`
        })
      }
      try{                        
        const Consult = await axios({url: '/Proyectos/GetTecnologias', method: 'GET'})
        if(Consult.data.Datos.length){
          store.commit('HiddenBody', true)
          Swal.close()
          return Consult.data.Datos
        }
      }catch(err){ 
        store.commit('ShowMessage', {
          Err: true, 
          tlt: 'Problemas en el modal', 
          msg: `Al parecer tuvimos problemas para obtener 
          la lista de tecnologias a mostrar en el modal, 
          le recomendamos que registre alguno.`
        })
        return []        
      }                        
    },   
    /*-----------AGREGAR NUEVOS REGISTROS-----------*/
    async Nuevo({state, dispatch}, Content){      
      dispatch('OpenModal')
      store.commit('LoadingAlert', {
        tlt: 'Agregando elemento', 
        msg: `Nos encontramos en el proceso de registrar los 
        datos anteriormente ingrezados en el formulario, esto 
        puede tardar algunos segundos.`
      })      
      try{                                                                                       
        await axios({url: `/${state.ShowSeccion}/NewData`, method: 'POST', data: Content, headers: {'Content-type': 'application/json', 'auth-token': store.state.Jwt.Token}})        
        store.commit('ShowMessage', {
          Err: false, 
          tlt: 'Registro exitoso', 
          msg: `Los datos ingrezados en el formulario, se 
          registraron con exito dentro de la base de datos.`
        })        
        return true                
      }catch(err){
        store.commit('ShowMessage', {
          Err: true, 
          tlt: 'Registro fallido', 
          msg: `Al parecer ocurrio un problema que evito el 
          registro de sus datos o no tiene los permisos suficientes.`
        })
        return false        
      }
    },    
    /*-----------DATOS PARA EDITAR-----------*/
    async Editar({state, commit, dispatch}, Id){
      store.commit('LoadingAlert', {
        tlt: 'Obteniendo elemento', 
        msg: `Estamos en proceso de encontrar el elemento 
        seleccionado, esto puede tardar algunos segundos.`
      })      
      try{                                                            
        const Consult = await axios({url: `/${state.ShowSeccion}/GetData/${Id}`, method: 'GET'})
        if(state.ShowSeccion != 'Proyectos') Swal.close()                                                
        commit('SetDataEdit', Consult.data.Datos)        
        dispatch('OpenModal')        
      }catch(err){
        store.commit('ShowMessage', {
          Err: true, 
          tlt: 'Sin datos para editar', 
          msg: `Al parecer el elemento seleccionado no 
          existe o no tiene los permisos sufcientes.`
        })       
        commit('SetDataEdit', {})        
      }
    },
    /*-----------GUARDAR LOS DATOS EDITADOS-----------*/
    async GuardarEditar({state, dispatch}, Data){
      dispatch('OpenModal')
      store.commit('LoadingAlert', {
        tlt: 'Actualizando datos', 
        msg: `Nos encontramos en proceso de culminar la edicion
        del elemento seleccionado, esto puede tardar algunos segundos.`
      })      
      try{                 
        await axios({url: `/${state.ShowSeccion}/EditData/${Data.Id}`, method: 'PUT', data: Data.Content, headers: {'Content-type': 'application/json', 'auth-token': store.state.Jwt.Token}})
        store.commit('ShowMessage', {
          Err: false, 
          tlt: 'Edicion exitosa', 
          msg: `Los cambios realizados sobre el elemento 
          seleccionado se desarrollo de forma exitosa.`
        })
        return true        
      }catch(err){
        console.log(err)
        store.commit('ShowMessage', {
          Err: true, 
          tlt: 'Datos sin guardar', 
          msg: `Se presento un problema al intentar 
          guardar los datos editados en la base de datos.`
        })
        return false
      }
    },
    /*-----------ELIMINAR LOS REGISTROS-----------*/
    async Eliminar({state, commit}, Id){      
      return await Swal.fire({
        icon: 'question',
        title: '¿Quiere eliminar?',
        html: `<p class="text-sm">En caso de que confirme la acción, 
        el registro seleccionado sera removido de manera permanente 
        de la base de datos.</p>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then(async(e)=>{
        if(e.isConfirmed){
          store.commit('LoadingAlert', {
            tlt: 'Eliminando elemento', 
            msg: `El proceso de eliminación puede tormar algunos 
            segundos para terminar de ejecutarse, le recomendamos 
            esperar hasta entonces.`
          })
          try{          
            const Consult = await axios({url: `/${state.ShowSeccion}/DeleteData/${Id}`, method: 'DELETE', headers: {'auth-token': store.state.Jwt.Token}})                                 
            store.commit('ShowMessage', {
              Err: false, 
              tlt: 'Eliminación correcta', 
              msg: `El elemento seleccionado se elimino de manera 
              correcta dentro de la base de datos.`
            })
            commit('SetMaxPage', Consult.data.MaxPage)
            if(state.DataFilt.Page > state.MaxPage){
              commit('SetDataFilt', {Page: state.MaxPage})
              return false
            }else return true                        
          }catch(err){
            console.log(err)
            store.commit('ShowMessage', {
              Err: true, 
              tlt: 'Eliminacion fallida', 
              msg: `Al parecer el elemento seleccionado tiene problemas 
              al momento de ser eliminado o no tiene los permisos 
              suficientes para esta acción.`
            })
            return false             
          }
        }
      })      
    }
  }
}