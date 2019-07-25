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
    },
}

const getters = {
    allBoards: (state) => state.boards,
    allLabels: () => state.labels,
    allLists: (state) => state.lists,
    allCards: (state) => {
        return state.cards
    },
    getSelected: (state) => state.selected,
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
            const data = {
                url: `boards/${state.selected.board}/cards`,
                params: {
                    fields: 'name,idList,url',
                },
            }
            const response = await httpService.get(data)
            console.log(response)
            if (responseService.isSuccess(response)) {
                commit('addCards', response.data)
                return responseService.getSuccess(response.data)
            }

            return responseService.getFailure()
        } catch (error) {
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
}

const Trello = {
    state,
    getters,
    mutations,
    actions,
}

export default Trello
