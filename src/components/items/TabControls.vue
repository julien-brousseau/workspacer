<template>
  <div class="ui mini vertical buttons">

    <button :disabled="locked.up" class="ui mini secondary button icon basic" @click="moveUp">
      <i class="icon caret up"></i>
    </button>

    <button :disabled="locked.down" class="ui mini secondary button icon basic" @click="moveDown">
      <i class="icon caret down"></i>
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
      return this.tabs.findIndex(t => t.Id === this.tab.Id);
    },
    locked () {
      const up = this.index === 0;
      const down = this.index === this.tabs.length - 1;
      return { up, down };
    }
  },
  methods: {

    moveUp () {
      if (!this.locked.up) this.moveTab('up');
    },
    moveDown () {
      if (!this.locked.down) this.moveTab('down');
    },

    // Reorder all {tabs} from same workspace as current tab based on the move direction
    moveTab (direction) {
      const { index, tabs } = this;
      const mod = index + (direction === 'down' ? 1 : -1);
      [tabs[index], tabs[mod]] = [tabs[mod], tabs[index]];
      this.$store.dispatch('editTabs', tabs.map((t, i) => ({ ...t, position: (i + 1) })));
    }
  }
};
</script>

<style scoped>
  .buttons {
    margin-right: 10px;
  }
</style>
