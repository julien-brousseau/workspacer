<template>
  <div class="Tabs">

    <!-- Section title and main controls -->
    <Header :title="'Edit tabs'" :routes="[header]" />

    <!-- Tab list commands -->
    <div class="ui basic segment">
      <button class="ui basic secondary button" @click="addActiveTab">
        Add tab
      </button>
      <button class="ui basic secondary button" @click="addAllTabsFromWindow">
        Add all tabs
      </button>
    </div>

    <!-- No tabs message -->
    <div v-if="!tabs.length" class="ui basic segment empty">
      This workspace contains no tabs
    </div>

    <!-- Tabs list -->
    <TabItem v-for="tab in tabs"
      :key="tab.Id"
      :tab="tab"
      :edit="null">
    </TabItem>

  </div>
</template>

<script>
import Header from '@/components/items/Header.vue';
import TabItem from '@/components/TabItem.vue';

export default {
  components: { Header, TabItem },
  data () {
    return { workspace: null };
  },
  created () {
    // Set [tabs] and {workspace} data
    const wsId = this.$route.params.wsId;
    this.workspace = { ...this.$store.getters.allWS.find(ws => ws.id === wsId) };
  },
  computed: {
    // Header data for link back to Workspace
    header () {
      return { title: 'Back', icon: 'caret left', route: { name: 'Workspace', params: { id: this.workspace.id } } };
    },
    // All [tabs] for this {workspace}
    tabs () {
      const wsId = this.$route.params.wsId;
      return this.$store.getters.allTabs.filter(tab => tab.wsId === wsId);
    }
  },
  methods: {
    // Add active browser {tab} to the current {workspace}
    addActiveTab () {
      this.$store.dispatch('addCurrentTab', this.workspace.id);
    },
    // Add all current window's [tabs] to current {workspace}
    addAllTabsFromWindow () {
      this.$store.dispatch('addAllTabsFromWindow', this.workspace.id);
    }
  }
};
</script>

<style scoped>
</style>
