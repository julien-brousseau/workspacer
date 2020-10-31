<template>
  <div id="Workspace">

    <!-- Section title and main controls -->
    <h1>
      <router-link :to="{ name: 'List' }" class="ui basic icon button right floated">
        <i class="caret left icon"></i>Back
      </router-link>
      Workspace details
    </h1>

    <!-- Workspace name -->
    <div class="ui basic segment">
      <router-link :to="{ name: 'Edit', params: { id: workspace.id } }" class="ui small basic button right floated btn-rename">
        Rename
      </router-link>
      <p class="label" style="border-bottom: 1px solid #DDD;">Workspace name</p>
      <h3 class="ui header">{{ workspace.title }}</h3>
    </div>

    <!-- Tab list -->
    <div class="ui basic segment divided list">
      <p class="label" style="border-bottom: 1px solid #DDD;">Tabs</p>
      <div v-if="!tabs.length" class="item">This workspace contains no tabs</div>
      <div v-for="tab in tabs" :key="tab" class="item">
        {{ tab.title | shorten }}
      </div>
    </div>

    <div class="ui basic segment">
      <!-- Open all tabs in new window -->
      <button class="ui basic button" @click="openInNewWindow">
        <i class="icon sticky note"></i>Open in new window
      </button>
      <!-- Add active tab to workspace -->
      <button class="ui basic button" @click="addCurrentTabToWorkspace">
        <i class="icon plus"></i>Add current tab</button>
      <!-- Edit tabs -->
      <router-link :to="{ name: 'Tabs', params: { wsId: workspace.id } }" class="ui basic button icon">
        <i class="icon cog"></i>Edit tabs</router-link>
    </div>

  </div>
</template>

<script>

export default {
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
  margin-top: 24px !important;
}
</style>
