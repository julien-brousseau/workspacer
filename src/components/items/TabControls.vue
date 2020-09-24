<template>
  <div class="ui mini vertical buttons">

    <button :disabled="lockedUp" class="ui mini button icon basic" @click="moveUp()">
      <i class="icon caret up"></i>
    </button>

    <button :disabled="lockedDown" class="ui mini button icon basic" @click="moveDown()">
      <i class="icon caret down"></i>
    </button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['tab'],
  computed: {
    ...mapGetters(['selectedWSTabs']),
    lockedUp () {
      const index = this.selectedWSTabs.indexOf(this.tab);
      return index === 0;
    },
    lockedDown () {
      const tabs = this.selectedWSTabs;
      const index = tabs.indexOf(this.tab);
      return index === tabs.length - 1;
    }
  },
  methods: {
    ...mapActions(['moveTab']),
    moveUp () { this.moveTab({ tab: this.tab, direction: 'up' }); },
    moveDown () { this.moveTab({ tab: this.tab, direction: 'down' }); }
  }
};
</script>

<style scoped>
  button {
    margin: 0px;
    padding: 2px;
  }
  .buttons {
    height: auto;
    padding: 0px;
    margin: 0px;
    margin-right: 10px;
  }
</style>
