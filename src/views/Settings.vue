<template>
<div id="ws-settings">

  <!-- Section title and main controls -->
  <h1>
    <button class="ui huge basic icon button"
      @click="back">
        <i class="caret left icon"></i>
    </button>
    Settings
  </h1>

  <h2>Export Workspaces as json</h2>
  <button class="ui blue icon button"
    @click="save">
      <i class="download icon"></i>
      Export
  </button>

  <h2>Delete all Workspace and Tabs</h2>
  <button class="ui red icon button"
    @click="clearWS">
      <i class="trash icon"></i>
      Delete
  </button>
  <h4 class="ui red header">Warning: This operation is not reversable</h4>

</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['toggleAddingWS', 'exportAllWS', 'clearWS']),
    back () { this.toggleAddingWS(false); },
    async save () {
      await this.exportAllWS();
      this.toggleAddingWS(false);
    }
  }
};
</script>
