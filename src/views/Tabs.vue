<template>
  <div class="Tabs">

    <!-- Section title and main controls -->
    <Header :title="this.workspace.title" :routes="[header]" />

    <!-- Tab list commands -->
    <Controls :workspace="workspace" />

    <!-- No tabs message -->
    <div v-if="!tabs.length" class="ui basic segment empty">
      This workspace contains no tabs
    </div>

    <!-- Tabs list -->
    <TabItem v-for="tab in tabs"
      :key="tab.tabId"
      :tab="tab"
      :edit="null">
    </TabItem>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Controls from '@/components/WorkspaceControls.vue';
import TabItem from '@/components/TabItem.vue';

export default {
  components: { Header, Controls, TabItem },
  data () {
    return { workspace: null };
  },
  created () {
    // Set {workspace} data
    const wsId = this.$route.params.id;
    this.workspace = { ...this.$store.getters.allWS.find(ws => ws.id === wsId) };
  },
  computed: {
    // Header data for link back to Workspace
    header () {
      return { title: 'Back', icon: 'caret left', route: { name: 'List', params: { id: this.workspace.id } } };
    },
    // All [tabs] for this {workspace}
    tabs () {
      const wsId = this.workspace.id;
      return this.$store.getters.allTabs.filter(tab => tab.wsId === wsId).sort((x, y) => y.pinned - x.pinned);
    }
  }
};
</script>

<style scoped>
</style>
