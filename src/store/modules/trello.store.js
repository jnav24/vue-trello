// import Vue from 'vue'
import { httpService, responseService } from '../../module'

const state = {
    boards: [],
    labels: [],
    lists: [],
    cards: [],
    selected: {
        board: '',
        list: '',
        label: '',
        search: '',
    },
    loading: false,
}

const getters = {
    allBoards: (state) => state.boards,
    allLabels: (state) => {
        return state.labels.map((label) => {
            return {
                id: label.id,
                name:`${label.name || 'Blank'} (${label.color || 'none'})`,
            }
        })
    },
    allLists: (state) => state.lists,
    allCards: (state, getters) => {
        let cards = JSON.parse(JSON.stringify(state.cards))

        if (getters.getSelected.label) {
            cards = cards.filter((card) => card.idLabels.indexOf(getters.getSelected.label) > -1)
        }

        if (getters.getSelected.list) {
            cards = cards.filter((card) => card.idList === getters.getSelected.list)
        }

        if (getters.getSelected.search) {
            cards = cards.filter((card) => card.name.indexOf(getters.getSelected.search) > -1)
        }

        return cards
    },
    getSelected: (state) => state.selected,
    isLoading: (state) => state.loading,
}

const actions = {
    async getAllBoards({ commit }) {
        try {
            const data = {
                url: 'members/me/boards',
                params: {
                    fields: 'name,url',
                },
            }

            const response = await httpService.get(data)

            if (responseService.isSuccess(response)) {
                commit('addBoards', response.data)
                return responseService.getSuccess(response.data)
            }

            return responseService.getFailure()
        } catch (error) {
            return responseService.getFailure()
        }
    },
    async getAllCards({ commit, state }) {
        try {
            commit('setLoading', true)
            const data = {
                url: `boards/${state.selected.board}/cards`,
                params: {
                    fields: 'name,idList,url,idLabels,desc',
                },
            }
            const response = await httpService.get(data)

            if (responseService.isSuccess(response)) {
                commit('addCards', response.data)
                commit('setLoading', false)
                return responseService.getSuccess(response.data)
            }

            commit('setLoading', false)
            return responseService.getFailure()
        } catch (error) {
            commit('setLoading', false)
            return responseService.getFailure()
        }
    },
    async getAllLabels({ commit, state }) {
        try {
            const data = {
                url: `boards/${state.selected.board}/labels`,
                params: {},
            }
            const response = await httpService.get(data)

            if (responseService.isSuccess(response)) {
                commit('addLabels', response.data)
                return responseService.getSuccess(response.data)
            }

            return responseService.getFailure()
        } catch (error) {
            return responseService.getFailure()
        }
    },
    async getAllLists({ commit, state }) {
        try {
            const data = {
                url: `boards/${state.selected.board}/lists`,
                params: {
                    fields: 'name,url',
                },
            }
            const response = await httpService.get(data)

            if (responseService.isSuccess(response)) {
                commit('addLists', response.data)
                return responseService.getSuccess(response.data)
            }

            return responseService.getFailure()
        } catch (error) {
            return responseService.getFailure()
        }
    },
}

const mutations = {
    addBoards(state, payload) {
        state.boards = payload
    },
    addLabels(state, payload) {
        state.labels = payload
    },
    addLists(state, payload) {
        state.lists = payload
    },
    addCards(state, payload) {
        state.cards = payload
    },
    addSelectedBoard(state, payload) {
        state.selected = { ...state.selected, board: payload }
    },
    addSelectedLabel(state, payload) {
        state.selected = { ...state.selected, label: payload }
    },
    addSelectedList(state, payload) {
        state.selected = { ...state.selected, list: payload }
    },
    addSelectedSearch(state, payload) {
        state.selected = { ...state.selected, search: payload }
    },
    resetCardsState(state) {
        state.cards = []
    },
    resetLabelsState(state) {
        state.labels = []
    },
    resetListsState(state) {
        state.lists = []
    },
    resetSelectedState(state) {
        state.selected = {
            board: '',
            label: '',
            list: '',
            search: '',
        }
    },
    setLoading(state, payload) {
        state.loading = payload
    },
}

const Trello = {
    state,
    getters,
    mutations,
    actions,
}

export default Trello
