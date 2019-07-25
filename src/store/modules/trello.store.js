// import Vue from 'vue'
import { httpService, responseService } from '../../module'

const state = {
    boards: [],
    lists: [],
    cards: [],
    selected: {},
}

const getters = {}

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
    async getAllCards({ commit }, payload) {
        try {
            const data = {
                url: `boards/${payload.id}/cards`,
                params: {
                    fields: 'name,url',
                },
            }
            const response = await httpService.get(data)

            if (responseService.isSuccess(response)) {
                commit('addCards', response.data)
                return responseService.getSuccess(response.data)
            }

            return responseService.getFailure()
        } catch (error) {
            return responseService.getFailure()
        }
    },
    async getAllLists({ commit }, payload) {
        try {
            const data = {
                url: `boards/${payload.id}/lists`,
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
    addLists(state, payload) {
        state.lists = payload
    },
    addCards(state, payload) {
        state.cards = payload
    }
}

const Trello = {
    state,
    getters,
    mutations,
    actions,
}

export default Trello
