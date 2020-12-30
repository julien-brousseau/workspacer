<template>
  <div id="Tabs">

    <!-- Section title and main controls -->
    <Header :title="this.workspace.title" :routes="[header]" />

    <!-- Tab list commands -->
    <Controls :workspace="workspace" />

    <!-- No tabs message -->
    <div v-if="!tabs.length" class="ui basic segment">
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
    return {
      // Header data for link back to Workspace
      header: { title: 'Back', icon: 'caret left', route: { name: 'Workspaces' } }
    };
  },
  computed: {
    // Current workspace object
    workspace () {
      return this.$store.getters.allWS.find(ws => ws.id === this.$route.params.id);
    },
    // All [tabs] for this {workspace}
    tabs () {
      return this.$store.getters.allTabs.filter(tab => tab.wsId === this.workspace.id).sort((x, y) => y.pinned - x.pinned);
    }
  }
};
</script>
