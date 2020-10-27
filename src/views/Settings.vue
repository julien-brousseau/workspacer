<template>
<div id="ws-settings">

  <!-- Section title and main controls -->
  <h1>
    <router-link to="/" class="ui huge basic icon button">
      <i class="caret left icon"></i>
    </router-link>
    Settings
  </h1>

  <h2>Export Workspaces as json</h2>
  <button class="ui blue icon button"
    @click="save">
      <i class="download icon"></i>
      Export
  </button>
  <div class="ui divider"></div>

  <h2>Import json file</h2>
  <div class="ui form">
    <div class="field">
      <textarea v-model="jsonData" placeholder="Enter json data to import"></textarea>
    </div>
    <button class="ui orange icon button"
      @click="load">
        <i class="download icon"></i>
        Import
    </button>
  </div>
  <div class="ui divider"></div>

  <h2>Delete all Workspace and Tabs</h2>
  <button class="ui red icon button"
    @click="clear">
      <i class="trash icon"></i>
      Delete
  </button>
  <h4 class="ui red header">Warning: This operation is irreversable</h4>

</div>
</template>

<script>
export default {
  data () {
    return { jsonData: '' };
  },
  methods: {
    // Save workspaces and tabs
    async save () {
      await this.$store.dispatch('exportToJSON');
      this.$router.push('/');
    },
    // Replace workspace and tabs with parsed jsonData
    async load () {
      await this.$store.dispatch('importfromJSON', JSON.parse(this.jsonData));
      this.$router.push('/');
    },
    // Remove all workspaces and tabs
    async clear () {
      await this.$store.dispatch('clearWS');
      this.$router.push('/');
    }
  }
};
</script>
