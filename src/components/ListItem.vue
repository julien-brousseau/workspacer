<template>
<div class="ui basic segment">

  <button class="ui small basic icon button right floated" @click="openWindow">
    <i class="window maximize outline icon"></i>
  </button>

  <button class="ui small basic icon button right floated" @click="addCurrentTabToWorkspace">
    <i class="plus icon"></i>
  </button>

  <!-- <i class="caret right icon"></i> -->
  <div class="ui content"  @click="select">
    <h3 class="ui header">{{ ws.title }}</h3>
    <div class="label">{{ tabsLabel }}</div>
  </div>

</div>
</template>

<script>
export default {
  props: ['ws'],
  computed: {
    selected () {
      return this.$store.getters.selectedWorkspace === this.ws;
    },
    tabs () {
      return this.$store.getters.allTabs.filter(t => t.wsId === this.ws.id);
    },
    tabsLabel () {
      const len = this.tabs.length;
      const s = (len === 1) ? '' : 's';
      return (!len) ? 'No tabs' : len + ' tab' + s;
    }
  },
  methods: {
    // Redirect to Workspace page
    select () {
      this.$router.push({ name: 'Workspace', params: { id: this.ws.id } });
    },
    // Create new window only if workspace contains tabs
    openWindow () {
      if (this.tabs.length) this.$store.dispatch('createWindow', this.ws);
    },
    // Add active tab to the workspace tab list
    addCurrentTabToWorkspace () {
      this.$store.dispatch('addCurrentTab', this.ws.id);
    }
  }
};
</script>

<style scoped>
.segment {
  cursor: pointer;
}
.segment:hover {
  background-color: rgb(250, 250, 250) !important;
}
.header {
  margin-bottom: 0px;
}
.label {
  color: #999;
}

.item.selected {
  /* border-left: 7px solid rgb(33, 133, 208) !important;
  border-top: 5px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
  border-bottom: 2px solid rgb(33, 133, 208) !important; */
  /* padding-top: 30px !important; */
}
.actions{
  /* text-align: right;
  margin-right: 7px; */
}
.selected .actions {
  /* padding-left: 30px; */
}

h2 {
  /* margin-top: 2px !important;
  margin-bottom: 0px !important; */
}
.tabs {
  /* padding: 0px 0px 10px 0px !important;
  border-top: 1px solid rgb(33, 133, 208);
  list-style-type: none; */
}
.tab {
  /* margin: 0px !important;
  padding: 8px 0px 0px 0px !important; */
}
.tab.header {
  /* font-size: 110%;
  font-weight: bold; */
}
.label {
  /* width: 38px;
  text-align: center; */
}
.image {
  /* width: 30px !important; */
}
</style>
