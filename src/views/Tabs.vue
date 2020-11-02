<template>
  <div class="Tabs">

    <!-- Section title and main controls -->
    <Header :title="'Edit tabs'" :routes="[{ title: 'Back', icon: 'caret left', route: { name: 'Workspace', params: { id: workspace.id } }}]" />

    <!-- Tab items -->
    <div v-if="!tabs.length" class="ui basic segment empty">
      This workspace contains no tabs
    </div>
    <TabItem v-for="tab in tabs"
      :key="tab.Id"
      :tab="tab">
    </TabItem>

    <!-- Tab list commands -->
    <div class="ui basic segment">
      <button class="ui basic secondary button" @click="addActiveTab">
        Add tab
      </button>
      <button class="ui basic secondary button" @click="addAllTabsFromWindow">
        Add all tabs
      </button>
    </div>

  </div>
</template>

<script>
import Header from '@/components/items/Header.vue';
import TabItem from '@/components/TabItem.vue';

export default {
  components: { Header, TabItem },
  data () {
    return {
      workspace: null,
      tabs: null
    };
  },
  created () {
    // Set [tabs] and {workspace} data
    const wsId = this.$route.params.wsId;
    this.workspace = { ...this.$store.getters.allWS.find(ws => ws.id === wsId) };
    this.tabs = [...this.$store.getters.allTabs.filter(tab => tab.wsId === wsId)];
  },
  methods: {
    // Add a tab to the list containing the current tab info
    addActiveTab () {
      this.$store.dispatch('addCurrentTab', this.workspace.id);
    // this.createTabs({ tabs: [tab], wsId: this.wsId });
    },

    // TODO: Move to background?
    // Add all current window's tabs
    async addAllTabsFromWindow () {
    //   const windowTabs = await this.getAllTabsFromWindow();
    //   this.createTabs({ tabs: windowTabs, wsId: this.wsId });
    }

  }
};
</script>

<style scoped>
</style>
