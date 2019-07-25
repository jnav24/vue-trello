import Vue from 'vue'
import Vuex from 'vuex'
import Trello from './modules/trello.store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Trello,
    },
})
