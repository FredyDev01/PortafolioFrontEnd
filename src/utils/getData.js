import { pages, getActions } from '@/enum/index'
import store from '@/store'

export function getDataList(action, page) {
  if (Object.values(getActions).includes(action)) {
    if (!page) {
      store.dispatch(action, { showIn: pages.portfolio })
      store.dispatch(action, { showIn: pages.panel })
    } else {
      store.dispatch(action, { showIn: page })
    }
  }
}
