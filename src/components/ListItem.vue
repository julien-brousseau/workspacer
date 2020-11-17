<template>
  <div class="ui basic segment">

    <!-- Controls -->
    <button class="ui small basic icon green button right floated" @click="openInNewWindow" title="Open in new window">
      <i class="external alternate icon"></i>
    </button>
    <button class="ui small basic icon primary button right floated" @click="addCurrentTabToWorkspace" title="Add current tab">
      <i class="plus icon"></i>
    </button>

    <!-- Workspace info -->
    <div class="ui content"  @click="select">
      <h3 class="ui header">{{ ws.title }}</h3>
      <div class="label">{{ tabsLabel }}</div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['ws'],
  computed: {
    tabs () {
      return this.$store.getters.allTabs.filter(t => t.wsId === this.ws.id);
    },
    tabsLabel () {
      const len = this.tabs.length;
      const s = (len === 1) ? '' : 's';
      return (!len) ? 'No tabs' : len + ' tab' + s;
    }
  },
  methods: {
    // Redirect to Workspace page
    select () {
      this.$router.push({ name: 'Workspace', params: { id: this.ws.id } });
    },
    // Create new window only if workspace contains tabs
    openInNewWindow () {
      if (this.tabs.length) this.$store.dispatch('createWindow', this.ws);
    },
    // Add active tab to the workspace tab list
    addCurrentTabToWorkspace () {
      this.$store.dispatch('addCurrentTab', this.ws.id);
    }
  }
};
</script>

<style scoped>
.segment {
  cursor: pointer;
}
.segment:hover {
  background-color: rgb(250, 250, 250) !important;
}
.header {
  margin-bottom: 0px;
}
.label {
  color: #999;
}
</style>
