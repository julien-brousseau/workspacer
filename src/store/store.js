import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ws: {}
  },
  mutations: {
    'LOAD_WS' (state, data) {
      state.ws = data
      console.log('MUTATION WS', state.ws)
    }
    // 'ADD_WS' (state) {
    //   state.ws.blop = { url: 'blop.com' }
    // }
  },
  actions: {
    loadWS: ({ commit }) => {
      console.log('ACTION: loadAllWS')
      //   this.$browser.storage.local.get('ws').then(result => {
      //     console.log('ACTION: result > ' + result)
      commit('LOAD_WS', { Personnal: { url: 'blop.com' } })
    //   })
    }
  },
  getters: {
    getAllWS: state => state.ws
  }
})
