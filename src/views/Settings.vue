<template>
  <div id="ws-settings">

    <!-- Section title and main controls -->
    <h1>
      <router-link :to="{ name: 'List' }" class="ui basic icon secondary button right floated">
        <i class="caret left icon"></i>Back
      </router-link>
      App settings
    </h1>

    <div class="ui basic segment">
      <h3>Export Workspaces as json</h3>
      <button class="ui basic primary button" @click="save">
        <i class="download icon"></i>Export
      </button>
    </div>

    <div class="ui basic segment">
      <h3>Import json file</h3>
      <div class="ui form">
        <div class="field">
          <textarea rows="3" v-model="jsonData" placeholder="Enter json data to import"></textarea>
        </div>
        <button class="ui basic orange button" @click="load">
          <i class="download icon"></i>Import
        </button>
      </div>
    </div>

    <div class="ui basic segment">
      <h3>Delete all Workspace and Tabs</h3>
      <button class="ui basic red button" @click="clear">
        <i class="trash icon"></i>Delete
      </button>
      <h4 class="ui red header">Warning: This operation is irreversible</h4>
    </div>

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
