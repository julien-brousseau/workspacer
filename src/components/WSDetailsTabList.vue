<template>
  <div class="ui items">

    <!-- Tab item -->
    <tab-item v-for="tab in tabs"
      :key="tab.Id"
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
    tabs () { return this.selectedWSTabs }
  },

  methods: {
    ...mapActions(['getCurrentTab', 'getAllTabsFromWindow', 'upsertTabs']),

    // Add a tab to the list containing the current tab info
    async createNewTab () {
      const tab = await this.getCurrentTab()
      this.upsertTabs({ tabs: [tab], wsId: this.ws.id })
    },

    // TODO: Move to background?
    // Add all current window's tabs
    async createNewTabsFromWindow () {
      const windowTabs = await this.getAllTabsFromWindow()
      this.upsertTabs({ tabs: windowTabs, wsId: this.ws.id })
    }

  }
}
</script>

<style scoped>
.actions {
  margin-top: 6px;
}
</style>
