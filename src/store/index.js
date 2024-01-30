import axios from 'axios'
import { createStore } from 'vuex'

import { generateFilterUrl } from '../utils/filters'

export default createStore({
  state: {
    showView: 'inicio',
    theme: 'light',
    refreshToken: null,
    jwt: {
      token: null,
      expireIn: null,
    },
    portfolio: {
      knowledge: {
        list: [],
        loading: true,
      },
      skill: {
        list: [],
        loading: true,
      },
      project: {
        filters: {
          type: '',
          order: -1,
          search: '',
          technologies: [],
          page: 1,
        },
        list: [],
        loading: true,
        maxPage: 0,
      },
    },
    panel: {
      showTable: null,
      knowledge: {
        filters: {
          order: -1,
          search: '',
          page: 1,
        },
        list: [],
        loading: true,
        maxPage: 0,
      },
      skill: {
        filters: {
          order: -1,
          search: '',
          page: 1,
        },
        list: [],
        loading: true,
        maxPage: 0,
      },
      project: {
        filters: {
          order: -1,
          search: '',
          page: 1,
        },
        list: [],
        loading: true,
        maxPage: 0,
      },
    },
  },

  mutations: {
    setShowView(state, payload) {
      state.showView = payload !== '' ? payload : 'inicio'
    },
    setTheme(state, payload) {
      state.theme = payload
      document.documentElement.classList = payload ?? 'light'
    },
    setRefreshToken(state, payload) {
      state.refreshToken = payload ?? null
    },
    setJwt(state, payload) {
      const { token, expiresIn } = payload ?? {}
      state.jwt.token = token ?? null
      state.jwt.expireIn = expiresIn ?? null
    },
    setPortfolioKnowledgeList(state, payload) {
      state.portfolio.knowledge.list = payload ?? []
    },
    setPortfolioKnowledgeLoading(state, payload) {
      state.portfolio.knowledge.loading = payload ?? true
    },
    setPortfolioSkillList(state, payload) {
      state.portfolio.skill.list = payload ?? []
    },
    setPortfolioSkillLoading(state, payload) {
      state.portfolio.skill.loading = payload ?? true
    },
    setPortfolioProjectFilters(state, payload) {
      const { type, order, search, technologies, page } = payload ?? {}
      const filters = state.portfolio.project.filters
      state.portfolio.project.filters = {
        type: type ?? filters.type,
        order: order ?? filters.order,
        search: search ?? filters.search,
        technologies: technologies ?? filters.technologies,
        page: page ?? filters.page,
      }
    },
    setPortfolioProjectList(state, payload) {
      state.portfolio.project.list = payload ?? []
    },
    setPortfolioProjectLoading(state, payload) {
      state.portfolio.project.loading = payload ?? true
    },
    setPortfolioProjectMaxPage(state, payload) {
      state.portfolio.project.maxPage = payload ?? 0
    },
    setPanelShowTable(state, payload) {
      state.panel.showTable = payload ?? null
    },
    setPanelKnowledgefilters(state, payload) {
      const { order, search, page } = payload ?? {}
      const filters = state.panel.knowledge.filters
      state.panel.knowledge.filters = {
        order: order ?? filters.order,
        search: search ?? filters.search,
        page: page ?? filters.page,
      }
    },
    setPanelKnowledgeList(state, payload) {
      state.panel.knowledge.list = payload ?? []
    },
    setPanelKnowledgeLoading(state, payload) {
      state.panel.knowledge.loading = payload ?? true
    },
    setPanelKnowledgeMaxPage(state, payload) {
      state.panel.knowledge.maxPage = payload ?? 0
    },
    setPanelSkillfilters(state, payload) {
      const { order, search, page } = payload ?? {}
      const filters = state.panel.skill.filters
      state.panel.skill.filters = {
        order: order ?? filters.order,
        search: search ?? filters.search,
        page: page ?? filters.page,
      }
    },
    setPanelSkillList(state, payload) {
      state.panel.skill.list = payload ?? []
    },
    setPanelSkillLoading(state, payload) {
      state.panel.skill.loading = payload ?? true
    },
    setPanelSkillMaxPage(state, payload) {
      state.panel.skill.maxPage = payload ?? 0
    },
    setPanelProjectfilters(state, payload) {
      const { order, search, page } = payload ?? {}
      const filters = state.panel.project.filters
      state.panel.project.filters = {
        order: order ?? filters.order,
        search: search ?? filters.search,
        page: page ?? filters.page,
      }
    },
    setPanelProjectList(state, payload) {
      state.panel.project.list = payload ?? []
    },
    setPanelProjectLoading(state, payload) {
      state.panel.project.loading = payload ?? true
    },
    setPanelProjectMaxPage(state, payload) {
      state.panel.project.maxPage = payload ?? 0
    },
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const { status, data } = await axios({
          method: 'POST',
          url: '/owner/login',
          data: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
        })
        if (status === 200) {
          const { refreshToken } = data
          commit('setRefreshToken', refreshToken)
          return refreshToken
        }
        throw new Error('El email o la contraseña son incorrectas')
      } catch (err) {
        throw new Error(err)
      }
    },
    async generateToken({ state, commit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/owner/getToken',
          headers: { refreshToken: state.refreshToken },
        })
        const { token, expiresIn } = data
        commit('setJwt', { token, expiresIn })
      } catch (err) {
        throw new Error(err)
      }
    },
    async getKnowledges({ state, commit }, payload) {
      const { showIn = 'portfolio' } = payload ?? {}
      const inPortfolio = showIn === 'portfolio'
      const mutationLoading = inPortfolio
        ? 'setPortfolioKnowledgeLoading'
        : 'setPanelKnowledgeLoading'
      const mutationList = inPortfolio
        ? 'setPortfolioKnowledgeList'
        : 'setPanelKnowledgeList'
      let url = '/knowledge/getData/0'
      if (!inPortfolio) {
        url = generateFilterUrl(url, state.panel.knowledge.filters)
      }
      try {
        commit(mutationLoading, true)
        let {
          data: { data, maxPage },
        } = await axios({ method: 'GET', url })
        data = data.map((knowledge) => ({
          ...knowledge,
          urlImage: `${knowledge?.urlImage}?timestamp=${new Date().toLocaleTimeString()}`,
        }))
        if (!inPortfolio) {
          commit('setPanelKnowledgeMaxPage', maxPage)
        }
        commit(mutationList, data)
        commit(mutationLoading, false)
      } catch (err) {
        throw new Error(err)
      }
    },
    async getSkills({ state, commit }, payload) {
      const { showIn = 'portfolio' } = payload ?? {}
      const inPortfolio = showIn === 'portfolio'
      const mutationLoading = inPortfolio
        ? 'setPortfolioSkillLoading'
        : 'setPanelSkillLoading'
      const mutationList = inPortfolio
        ? 'setPortfolioSkillList'
        : 'setPanelSkillList'
      let url = '/skill/getData/0'
      if (!inPortfolio) {
        url = generateFilterUrl(url, state.panel.skill.filters)
      }
      try {
        commit(mutationLoading, true)
        const {
          data: { data, maxPage },
        } = await axios({ method: 'GET', url })
        if (!inPortfolio) {
          commit('setPanelSkillMaxPage', maxPage)
        }
        commit(mutationList, data)
        commit(mutationLoading, false)
      } catch (err) {
        throw new Error(err)
      }
    },
    async getProjects({ state, commit }, payload) {
      const { showIn = 'portfolio' } = payload ?? {}
      const inPortfolio = showIn === 'portfolio'
      const mutationLoading = inPortfolio
        ? 'setPortfolioProjectLoading'
        : 'setPanelProjectLoading'
      const mutationList = inPortfolio
        ? 'setPortfolioProjectList'
        : 'setPanelProjectList'
      const mutationMaxPage = inPortfolio
        ? 'setPortfolioProjectMaxPage'
        : 'setPanelProjectMaxPage'
      const url = generateFilterUrl(
        '/project/getData/0',
        inPortfolio
          ? state.portfolio.project.filters
          : state.panel.project.filters,
      )
      try {
        commit(mutationLoading, true)
        let {
          data: { data, maxPage },
        } = await axios({ url, method: 'GET' })
        data = data.map((project) => ({
          ...project,
          urlImage: `${project?.urlImage}?timestamp=${new Date().toLocaleTimeString()}`,
        }))
        commit(mutationMaxPage, maxPage)
        commit(mutationList, data)
        commit(mutationLoading, false)
      } catch (err) {
        throw new Error(err)
      }
    },
  },
})
