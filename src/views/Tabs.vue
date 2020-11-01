<template>
  <div class="Tabs">

    <!-- Section title and main controls -->
    <h1>
      <router-link :to="{ name: 'Workspace', params: { id: workspace.id } }" class="ui basic icon secondary button right floated">
        <i class="caret left icon"></i>Back
      </router-link>
      Edit tabs
    </h1>

    <!-- Tab items -->
    <div v-if="!tabs.length" class="ui basic segment empty">
      This workspace contains no tabs
    </div>
    <TabItem v-for="tab in tabs"
      :key="tab.Id"
      :tab="tab">
    </TabItem>

    <!-- Tabs commands -->
    <div class="ui basic segment">
      BUTTONS
      <!-- <button class="ui primary button" @click="createNewTab">
        Add tab
      </button>
      <button class="ui primary button" @click="createNewTabsFromWindow">
        Add all tabs
      </button> -->
    </div>

  </div>
</template>

<script>
import TabItem from '@/components/TabItem.vue';

export default {
  components: { TabItem },
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
    // async createNewTab () {
    // Use store.dispatch(addCurrentTab)
    // const tab = await this.getCurrentTab();
    // this.createTabs({ tabs: [tab], wsId: this.wsId });
    // },

    // TODO: Move to background?
    // Add all current window's tabs
    // async createNewTabsFromWindow () {
    //   const windowTabs = await this.getAllTabsFromWindow();
    //   this.createTabs({ tabs: windowTabs, wsId: this.wsId });
    // }

  }
};
</script>

<style scoped>
</style>
