<template>
  <div class="item" :class="{selected: selected}">

    <!-- Label -->
    <div class="image">
      <div class="ui basic grey label">{{ tabs.length }}</div>
    </div>

    <div class="content">

      <!-- Tab info and expand link -->
      <h2 @click="selectWS">
        <i class="caret icon" :class="[selectedCaret]"></i>
        {{ ws.title }}
      </h2>

      <!-- Static list of tabs -->
      <ul v-if="selected" class="tabs">
        <li v-if="!tabs.length" class="tab">This workspace contains no tabs</li>
        <li class="tab" v-for="tab in tabs" :key="tab.Id">{{ tab.title | shorten }}</li>
      </ul>
    </div>

    <!-- WS controls -->
    <div class="actions right floated">
      <button class="ui basic button icon" :class="[cls.buttonOpen]" @click="openWindow">
        <i class="icon sticky note"></i></button>
      <button class="ui basic button icon" :class="[cls.buttonAdd]" @click="addCurrentTab">
        <i class="icon plus"></i></button>
      <button class="ui basic button icon" :class="[cls.buttonEdit]" @click="editWS">
        <i class="icon cog"></i></button>
    </div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['ws'],
  computed: {
    ...mapGetters(['selectedWS', 'allTabs']),

    // Getters
    tabs () { return this.allTabs.filter(t => t.wsId === this.ws.id); },
    selected () { return this.selectedWS && this.selectedWS.id === this.ws.id; },

    // Dynamic class control
    selectedCaret () { return this.selected ? 'down' : 'right'; },
    cls () {
      return {
        buttons: this.selected ? 'vertical labeled icon' : '',
        buttonOpen: this.selected ? 'large green' : 'basic small',
        buttonAdd: this.selected ? 'large primary' : 'basic small',
        buttonEdit: this.selected ? 'large orange' : 'basic small'
      };
    }

  },
  methods: {
    ...mapActions(['createTabs', 'getCurrentTab', 'toggleSelectedWS', 'createWindow']),

    // Setup/clear the global selected workspace
    selectWS () { this.toggleSelectedWS(this.selectedWS && this.selectedWS.id === this.ws.id ? null : this.ws.id); },
    // Set the workspace as globally editing
    editWS () {
      this.$router.push({ name: 'Workspace', params: { id: 1 } });
    },
    // Create new window only if workspace contains tabs
    openWindow () {
      if (this.tabs.length) this.createWindow(this.ws.id);
    },
    // TODO: !Repeating in other files
    // Add active tab to the workspace tab list
    async addCurrentTab () {
      const currentTab = await this.getCurrentTab();
      this.createTabs({ tabs: [currentTab], wsId: this.ws.id });
    }

  }
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid #EEEEEE !important;
  padding: 25px 5px 15px 10px !important;
  margin: 0px !important;
}
.item:hover {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
}
.item.selected {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-top: 5px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
  border-bottom: 2px solid rgb(33, 133, 208) !important;
  /* padding-top: 30px !important; */
}
.actions{
  text-align: right;
  margin-right: 7px;
}
.selected .actions {
  padding-left: 30px;
}

h2 {
  /* margin-top: 2px !important;
  margin-bottom: 0px !important; */
  cursor: pointer;
}
.tabs {
  padding: 0px 0px 10px 0px !important;
  border-top: 1px solid rgb(33, 133, 208);
  list-style-type: none;
}
.tab {
  margin: 0px !important;
  padding: 8px 0px 0px 0px !important;
}
.tab.header {
  font-size: 110%;
  font-weight: bold;
}
.label {
  width: 38px;
  text-align: center;
}
.image {
  width: 30px !important;
}
</style>
