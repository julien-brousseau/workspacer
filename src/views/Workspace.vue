<template>
  <div id="Workspace">

    <!-- App header -->
    <Header :title="'Workspace details'" :routes="[{ title: 'Back', icon: 'caret left', route: { name: 'List' } }]" />

    <!-- Workspace name -->
    <div class="ui basic segment">
      <router-link :to="{ name: 'Edit', params: { id: workspace.id } }" class="ui small basic secondary button right floated btn-rename">
        Rename
      </router-link>
      <p class="label">Name</p>
      <h3 class="ui header">{{ workspace.title }}</h3>
    </div>

    <!-- Tab list and controls -->
    <div class="ui basic segment divided list">
      <p class="label">Tabs</p>
      <div v-if="!tabs.length" class="item">This workspace contains no tabs</div>
      <div v-for="(tab, i) in tabs" :key="i" class="item">
        {{ tab.title | shorten }}
      </div>

      <button class="ui basic secondary button" @click="addCurrentTabToWorkspace">
        <i class="plus icon"></i>Add current tab</button>
      <router-link :to="{ name: 'Tabs', params: { wsId: workspace.id } }" class="ui secondary basic button" style="margin-top: 10px;">
        <i class="pen square icon"></i>View tabs</router-link>
    </div>

    <!-- Workspace controls -->
    <div class="ui basic segment">
      <button class="ui basic secondary button" @click="openInNewWindow">
        <i class="external alternate icon"></i>Open in new window
      </button>
    </div>

  </div>
</template>

<script>
import Header from '@/components/items/Header.vue';

export default {
  components: { Header },
  data () {
    return { workspace: null };
  },
  created () {
    this.workspace = this.$store.getters.allWS.find(ws => ws.id === this.$route.params.id);
  },
  computed: {
    tabs () {
      return this.$store.getters.allTabs.filter(t => t.wsId === this.workspace.id);
    }
  },
  methods: {
    // Create new window only if workspace contains tabs
    openInNewWindow () {
      if (this.tabs.length) this.$store.dispatch('createWindow', this.workspace);
    },
    // Add active tab to the workspace tab list
    addCurrentTabToWorkspace () {
      this.$store.dispatch('addCurrentTab', this.workspace.id);
    }
  }
};
</script>

<style scoped>
.segment {
  border: 0px none !important;
}
.header {
  margin-top: 5px;
}
.label {
  margin-bottom: 0px;
  font-size: 0.92em;
  font-weight: bold;
}
.item {
  padding: 8px 0px !important;
}
.btn-rename {
  border: 0px none !important;
  margin-top: 20px !important;
}
</style>
