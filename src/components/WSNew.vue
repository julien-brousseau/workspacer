<template>
  <div class="ui attached segment">

    <div v-if="loading" class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>

    <form v-else @submit.prevent class="ui form">

      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.name"></div>

      <div class="field" v-if="showTabs">
        <label>Included tabs</label>
        <div class="ui grid segment segments">

          <div v-for="tab in workspace.tabs" class="row segment" :key="tab.id">

            <div class="one wide column">
              <i class="file outline icon"></i></div>

            <div class="twelve wide column ui item">
              <h4>{{ tab.title }}</h4>
              <p>{{ tab.url }}</p>
            </div>

            <div class="three wide column right aligned">
              <!-- <button
                class="ui compact icon button"
                @click="false"
                :class="{ green: tab.pinned }">
                  <i class="pin icon"></i></button> -->
              <button
                class="ui compact icon red button"
                @click="deleteTab(tab.id)">
                  <i class="trash icon"></i></button>
            </div>

          </div>
        </div>

      </div>

      <button
        class="ui large primary button"
        @click="submit">
          Create</button>
      <button
        class="ui button"
        @click="toggleAddingWS">
          Cancel</button>
    </form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      workspace: null,
      loading: null
    }
  },
  computed: {
    ...mapGetters(['addingWS', 'showTabs', 'newWS'])
  },
  methods: {
    ...mapActions(['toggleAddingWS', 'getAllTabsFromWindow']),
    async init () {
      this.loading = true
      this.workspace = { name: 'Workspace 1', tabs: [] }
      if (this.showTabs) this.workspace.tabs = await this.getAllTabsFromWindow()
      this.loading = false
    },
    submit (e) { console.log('e :>> ', e) },
    deleteTab (id) {
      this.workspace.tabs = this.workspace.tabs.filter(t => t.id !== id)
    }

    // @ Next
    // pinTab (id) {
    //   const pos = this.workspace.tabs.map((t, i) => { if (t.id === id) return i })
    //   console.log('pos :>> ', pos)
    // },

    // Will be useful someday
    // refreshTabsOrder () {

    // }

  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.column {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>
