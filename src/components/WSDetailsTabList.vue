<template>
  <div class="ui items">

    <!-- Tab item -->
    <tab-item v-for="tab in tabs"
      :key="tab.id"
      :tab="tab">
    </tab-item>

    <!-- Tabs commands -->
    <div class="actions" style="margin-top:20px;">
      <button class="ui orange button"
        @click="createNewTab">Add tab
      </button>
      <button class="ui button"
        @click="createNewTabsFromWindow">Add all tabs
      </button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WSDetailsTabListItem from './WSDetailsTabListItem.vue'

export default {
  components: {
    tabItem: WSDetailsTabListItem
  },

  computed: {
    ...mapGetters(['selectedWS', 'selectedWSTabs']),
    ws () { return this.selectedWS },
    tabs () { return this.selectedWSTabs }
  },

  methods: {
    ...mapActions(['getCurrentTab', 'getAllTabsFromWindow', 'createOrUpdateTabs']),

    // Add a tab to the list containing the current tab info
    async createNewTab () {
      const { title, url } = await this.getCurrentTab()
      const fURL = url.slice(0, 30)
      return await this.createOrUpdateTabs([{ title, url: fURL, wsId: this.ws.id }])
    },

    // Add all current window's tabs
    async createNewTabsFromWindow () {
      // const windowTabs = await this.getAllTabsFromWindow()
      // this.tabs = [...this.tabs, ...windowTabs.map(t => { return { ...t, tempId: true } })]
    }

  }
}
</script>

<style scoped>
.actions {
  margin-top: 6px;
}
</style>
