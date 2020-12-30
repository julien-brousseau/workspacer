<template>
  <sui-segment style="border: 0px none">

    <sui-dropdown class="basic primary" text="Add tab" button floating>
      <sui-dropdown-menu>
        <!-- <sui-dropdown-item @click="addEmptyTabToWorkspace"><sui-icon name="square outline" />Empty tab</sui-dropdown-item> -->
        <sui-dropdown-item @click="addCurrentTabToWorkspace"><sui-icon name="window maximize outline" />Current tab</sui-dropdown-item>
        <sui-dropdown-item @click="addAllTabsFromWindow"><sui-icon name="window restore outline" />All tabs from window</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>

    <sui-dropdown class="basic green" text="Open" button floating>
      <sui-dropdown-menu>
        <sui-dropdown-item @click="openInNewWindow"><sui-icon name="external alternate" />In new window</sui-dropdown-item>
        <sui-dropdown-item @click="openInNewWindow"><sui-icon name="external alternate" />Replace current window</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>

    <!-- <sui-button basic
      color="green"
      class="btn-action"
      @click="openInNewWindow"
      content="Open" icon="external alternate">
    </sui-button> -->

    <sui-button basic
      color="orange"
      class="btn-refresh"
      @click="replaceWorkspace"
      content="Refresh" icon="exchange">
    </sui-button>

    <sui-dropdown class="basic secondary right floated btn-options" text="Options" button floating>
      <sui-dropdown-menu :style="{'margin-left': '-50px'}">
        <router-link :to="{ name: 'EditWorkspace', params: { id: workspace.id } }" tag="sui-dropdown-item"><sui-icon name="pencil" />Rename</router-link>
        <sui-dropdown-item class="btn-clear" @click="clearAllTabs"><sui-icon name="times circle outline" />Delete all tabs</sui-dropdown-item>
        <sui-dropdown-item class="btn-delete" @click="deleteWorkspace"><sui-icon name="trash" />Delete workspace</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>

  </sui-segment>
</template>

<script>
export default {
  props: ['workspace'],
  methods: {
    // Remove all tabs from workspace
    clearAllTabs () {
      this.$store.dispatch('deleteAllTabsFromWorkspace', this.workspace.id);
    },
    // Delete workspace and all its tabs
    async deleteWorkspace () {
      await this.$store.dispatch('deleteWorkspace', this.workspace.id);
      this.$router.push('/');
    },
    // Add an empty tab to the workspace tab list
    // addEmptyTabToWorkspace () {
    //   this.$router.push({ name: 'NewTab', params: { wsId: this.workspace.id } });
    // },
    // Add active tab to the workspace tab list
    addCurrentTabToWorkspace () {
      this.$store.dispatch('addCurrentTabToWorkspace', this.workspace.id);
    },
    // Add all current window's [tabs] to current {workspace}
    addAllTabsFromWindow () {
      this.$store.dispatch('addAllTabsFromWindow', this.workspace.id);
    },
    // Replace all tabs of current workspace with current window's tabs
    replaceWorkspace () {
      this.$store.dispatch('replaceWorkspace', this.workspace.id);
    },
    // Create new window only if workspace contains tabs
    openInNewWindow () {
      const tabs = this.$store.getters.allTabs.filter(t => t.wsId === this.workspace.id);
      if (tabs.length) this.$store.dispatch('openWorkspaceInWindow', this.workspace);
    }
  }
};
</script>

<style scoped>
.btn-clear {
  color: rgb(208, 109, 44) !important;
}
.btn-delete {
  color: red !important;
}
</style>
