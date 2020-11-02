<template>
  <div id="ws-settings">

    <!-- App header -->
    <Header :title="'App settings'" :routes="[{ title: 'Back', icon: 'caret left', route: { name: 'List' } }]" />

    <!-- Export -->
    <div class="ui basic segment">
      <h3>Export Workspaces as json</h3>
      <button class="ui primary button" @click="save">
        <i class="upload icon"></i>Export
      </button>
    </div>

    <!-- Import -->
    <div class="ui basic segment">
      <h3>Import json data</h3>
      <div class="ui form">
        <div class="field">
          <textarea rows="3" v-model="jsonData" placeholder="Enter json data to import"></textarea>
        </div>
        <button class="ui orange button" @click="load">
          <i class="download icon"></i>Import
        </button>
      </div>
    </div>

    <!-- Clear database -->
    <div class="ui basic segment">
      <h3>Delete all Workspace and Tabs</h3>
      <button class="ui red button" @click="clear">
        <i class="trash icon"></i>Delete
      </button>
      <h4 class="ui red header">Warning: This operation is irreversible</h4>
    </div>

  </div>
</template>

<script>
import Header from '@/components/items/Header.vue';

export default {
  components: { Header },
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
