<template>
  <sui-segment>

    <sui-dropdown class="basic primary" text="Add tab to workspace" button floating>
      <sui-dropdown-menu>
        <!-- <sui-dropdown-item @click="addEmptyTabToWorkspace"><sui-icon name="square outline" />Empty tab</sui-dropdown-item> -->
        <sui-dropdown-item @click="addCurrentTabToWorkspace"><sui-icon name="window maximize outline" />Current tab</sui-dropdown-item>
        <sui-dropdown-item @click="addAllTabsFromWindow"><sui-icon name="window restore outline" />All tabs from window</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>

    <sui-button basic
      color="green"
      class="btn-action"
      @click="openInNewWindow"
      content="Open in new window" icon="external alternate">
    </sui-button>

  </sui-segment>
</template>

<script>
export default {
  props: ['workspace'],
  methods: {
    // Add an empty tab to the workspace tab list
    // addEmptyTabToWorkspace () {

    // },
    // Add active tab to the workspace tab list
    addCurrentTabToWorkspace () {
      this.$store.dispatch('addCurrentTab', this.workspace.id);
    },
    // Add all current window's [tabs] to current {workspace}
    addAllTabsFromWindow () {
      this.$store.dispatch('addAllTabsFromWindow', this.workspace.id);
    },
    // Create new window only if workspace contains tabs
    openInNewWindow () {
      const tabs = this.$store.getters.allTabs.filter(t => t.wsId === this.workspace.id);
      if (tabs.length) this.$store.dispatch('createWindow', this.workspace);
    }
  }
};
</script>
