import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blop: [1, 2, 3]
  },
  mutations: {
    'CHANGE_BLOP' (state) {
      const nextNum = state.blop[state.blop.length - 1] + 1
      state.blop.push(nextNum)
    }
    // 'CLEAR_TASKS' (state) {
    //   state.taskList = []
    // },
    // 'LOAD_TASKS' (state, tasks) {
    //   state.taskList = tasks
    // },
    // 'COMPLETE_TASK' (state, task) {
    //   state.taskList = state.taskList.map(t => (t._id === task._id) ? task : t)
    // },
    // 'ADD_XP' (state, xp) {
    //   state.user.xp += xp
    // },
    // 'TOGGLE_TASKS_LOADED' (state) {
    //   state.tasksLoadingComplete = true
    // },
    // 'TOGGLE_SHOW_COMPLETED' (state) {
    //   state.showCompleted = !state.showCompleted
    // },
    // 'TOGGLE_ADDING_TASK' (state) {
    //   state.addingTask = !state.addingTask
    // },
    // 'INIT_USER' (state, user) {
    //   state.user = user
    // }
  },
  actions: {
    changeBlop: ({ commit }) => {
      commit('CHANGE_BLOP')
    }
    // addTask: ({ commit }, task) => {
    //   Vue.http.post('tasks', task)
    //     .then(res => commit('ADD_TASK', res.body))
    //     .catch(e => console.log('Error:', e))
    // },
    // loadTasks: ({ commit, state }) => {
    //   Vue.http.get('tasks')
    //     .then(res => res.body)
    //     .then(data => {
    //       if (data) {
    //         const tasks = Object.keys(data).map(id => {
    //           return { ...data[id], id }
    //         })
    //         commit('LOAD_TASKS', tasks)
    //         if (!state.tasksLoadingComplete) commit('TOGGLE_TASKS_LOADED')
    //       }
    //     })
    //     .catch(e => console.log(e))
    // },
    // completeTask: ({ state, commit, getters }, task) => {

    //   // Skip if the task is invalid or already completed
    //   if (!task || task.completed) return null

    //   Vue.http.post(`tasks/${task._id}`)
    //     .then(res => {

    //       // Complete task and add xp
    //       commit('COMPLETE_TASK', res.body)
    //       commit('ADD_XP', task.xp)

    //       // Levelup as many times as needed
    //       while (state.user.xp >= getters.xpForNextLevel) {
    //         state.user.level++
    //         alert(`You just advanced to level ${state.user.level}`)
    //       }

    //       // Update user info
    //       const r = Vue.http.post('users/edit', state.user)
    //       .then().catch(e => console.log('error:', e))

    //       // Show floating xp text
    //       state.showFloatingXp = task.xp
    //       setTimeout(() => { state.showFloatingXp = false }, 1000)

    //     })
    //     .catch(e => console.log(e))

    // },
    // toggleShowCompleted ({ commit }) {
    //   commit('TOGGLE_SHOW_COMPLETED')
    // },
    // toggleAddingTask ({ commit }) {
    //   commit('TOGGLE_ADDING_TASK')
    // },
    // initUser({ commit }, reset = false) {
    //   const r = Vue.http.post('users', {reset})
    //     .then(res => commit('INIT_USER', res.body))
    //     .catch(e => console.log('Error:', e))
    // }
  },
  getters: {
    // tasks: state => {
    //   const list = (state.showCompleted) ? state.taskList : state.taskList.filter(t => !t.completed)
    //   return list
    //     .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
    //     .sort((a, b) => a.completed > b.completed ? 1 : -1)
    // },
    blop: state => 'BLOP: ' + state.blop.toString()
    // addingTask: state => state.addingTask,
    // showCompleted: state => state.showCompleted,
    // xpForNextLevel: state => state.user.level * 300,
    // showFloatingXp: state => state.showFloatingXp,
    // tasksLoadingComplete: state => state.tasksLoadingComplete
  }
})
