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
import { mapGetters, mapActions } from 'vuex';
import WSDetailsTabListItem from './WSDetailsTabListItem.vue';

export default {
  props: ['wsId'],
  components: {
    tabItem: WSDetailsTabListItem
  },

  computed: {
    ...mapGetters(['allTabs']),
    tabs () { return this.allTabs.filter(t => t.wsId === this.wsId); }
  },

  methods: {
    ...mapActions(['getCurrentTab', 'getAllTabsFromWindow', 'createTabs']),

    // Add a tab to the list containing the current tab info
    async createNewTab () {
      const tab = await this.getCurrentTab();
      this.createTabs({ tabs: [tab], wsId: this.wsId });
    },

    // TODO: Move to background?
    // Add all current window's tabs
    async createNewTabsFromWindow () {
      const windowTabs = await this.getAllTabsFromWindow();
      this.createTabs({ tabs: windowTabs, wsId: this.wsId });
    }

  }
};
</script>

<style scoped>
.actions {
  margin-top: 6px;
}
</style>
