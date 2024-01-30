import { alertResults } from '@/enum/index'

import { showMessage, confirmMessage, loadingMessage } from './alerts'

export function showMessageModal({ resourceName, action, status }) {
  const result = status ? alertResults.success : alertResults.error
  const msgSuccess = `
    ¡El proceso de ${action.msg} <strong>${resourceName.toLowerCase()}</strong> se realizo 
    con éxito dentro de la plataforma! Ahora es visible para todos.
  `
  const msgError = `
    Hubo problemas al ${action.msg} <strong>${resourceName.toLowerCase()}</strong> en la 
    plataforma. Por favor, inténtalo de nuevo más tarde.`
  showMessage({
    err: !status,
    tlt: `${action.tlt} ${result}`,
    msg: status ? msgSuccess : msgError,
  })
}

export async function confirmMessageModal({ resourceName }) {
  return await confirmMessage({
    tlt: 'Confirmar eliminación',
    msg: `
      En caso confirme la alerta se procedera a eliminar <strong>${resourceName}</strong> registrado dentro 
      de la plataforma de manera permanente.
    `,
  })
}

export function loadingMessageModal({ resourceName, action }) {
  loadingMessage({
    tlt: `${action.tlt} en proceso`,
    msg: `Estamos procesando tu solicitud de ${action.tlt.toLowerCase()} para <strong>${resourceName}</strong>.`,
  })
}
