<template>
  <div class="ui mini horizontal buttons">

    <button
      class="ui mini toggle button icon basic"
      :class="pinned"
      @click="pinTab">
      <i class="pin icon"></i>
    </button>

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
    locked () {
      const up = this.index === 0;
      const down = this.index === this.tabs.length - 1;
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

    moveUp () {
      if (!this.locked.up) this.moveTab('up');
    },
    moveDown () {
      if (!this.locked.down) this.moveTab('down');
    },

    // Reorder all {tabs} from same workspace as current tab based on the move direction (up/down)
    moveTab (direction) {
      const { index, tabs } = this;
      const mod = index + (direction === 'down' ? 1 : -1);
      [tabs[index], tabs[mod]] = [tabs[mod], tabs[index]];
      this.$store.dispatch('editTabs', tabs);
      // this.$store.dispatch('editTabs', tabs.map((t, i) => ({ ...t, position: (i + 1) })));
    },

    //
    pinTab () {
      // this.$store.dispatch('reorderTabs', this.tab.wsId);
      // this.$store.dispatch('editTabs', [{ ...this.tab, pinned: !this.tab.pinned }]);
    },

    removeTab () {
      this.$store.dispatch('deleteTab', this.tab.tabId);
    }
  }
};
</script>
