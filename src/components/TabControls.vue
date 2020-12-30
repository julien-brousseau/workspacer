<template>
  <div class="ui mini horizontal basic buttons">

    <button
      :disabled="locked.up"
      class="ui mini secondary button icon basic"
      @click="moveUp">
      <i class="icon caret up"></i>
    </button>

    <button
      :disabled="locked.down"
      class="ui mini secondary button icon basic"
      @click="moveDown">
      <i class="icon caret down"></i>
    </button>

    <button
      class="ui mini toggle button icon basic"
      :class="pinned"
      @click="pinTab">
      <i class="pin icon"></i>
    </button>

    <router-link :to="route"
      class="ui mini orange button icon basic">
      <i class="pencil icon"></i>
    </router-link>

    <button @click="removeTab"
      class="ui mini red button icon basic">
      <i class="trash icon"></i>
    </button>

  </div>
</template>

<script>
export default {
  props: ['tab'],
  computed: {
    tabs () {
      return this.$store.getters.allTabs.filter(t => t.wsId === this.tab.wsId);
    },
    index () {
      return this.tabs.findIndex(t => t.tabId === this.tab.tabId);
    },
    // Check if tab shifting is allowed
    locked () {
      const { index, tabs } = this;
      const up = index === 0;
      const down = index === tabs.length - 1;
      return { up, down };
    },
    route () {
      return { name: 'Tab', params: { tabId: this.tab.tabId } };
    },
    pinned () {
      return this.tab.pinned ? 'blue' : 'secondary';
    }
  },
  methods: {
    // Button move commands
    moveUp () { if (!this.locked.up) this.moveTab('up'); },
    moveDown () { if (!this.locked.down) this.moveTab('down'); },

    // Shift tab position depending on direction ('up' or 'down')
    moveTab (direction) {
      const { index, tabs } = this;
      const mod = direction === 'down' ? 1 : -1;
      const modTabs = [this.tab, tabs[index + mod]];
      const reversePosArray = modTabs.map(t => t.position).reverse();
      this.$store.dispatch('createOrUpdateTabs', { tabs: modTabs.map((t, i) => ({ ...t, position: reversePosArray[i] })) });
    },

    //
    pinTab () {
      const { tab } = this;
      this.$store.dispatch('createOrUpdateTabs', { tabs: [{ ...tab, pinned: !tab.pinned }] });
    },

    //
    removeTab () {
      this.$store.dispatch('deleteTab', this.tab.tabId);
    }
  }
};
</script>
