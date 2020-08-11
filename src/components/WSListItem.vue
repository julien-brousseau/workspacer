<template>
  <div class="item" :class="{selected: selected}">

    <!-- Label -->
    <div class="image" style="width:auto;">
      <div class="ui basic grey label">{{ tabs.length }}</div>
    </div>

    <div class="content">

      <!-- Tab info and expand link -->
      <h3 @click="selectWS">
        <i class="ui caret icon" :class="[selectedCaret]"></i>
        {{ ws.title }}
      </h3>

      <!-- List of static tabs -->
      <ul v-if="selected" class="tabs">
        <li class="tab header">Included tabs</li>
        <li class="tab" v-for="tab in tabs" :key="tab.id" >{{ tab.title }}</li>
      </ul>
    </div>

    <!-- WS controls -->
    <div class="actions right floated">
      <button class="ui button icon" :class="[cls.buttonOpen]" @click="openWS">
        <i class="icon sticky note"></i></button>
      <button class="ui button icon" :class="[cls.buttonAdd]" @click="addCurrentTab">
        <i class="icon plus"></i></button>
      <button class="ui button icon" :class="[cls.buttonEdit]" @click="editWS">
        <i class="icon pencil"></i></button>
    </div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['ws'],
  computed: {
    ...mapGetters(['selectedWS', 'allTabs']),

    tabs () { return this.allTabs.filter(t => t.wsId === this.ws.id) },
    selected () { return this.selectedWS === this.ws.id },

    // Dynamic class control
    selectedCaret () { return this.selected ? 'down' : 'right' },
    cls () {
      return {
        buttons: this.selected ? 'vertical labeled icon' : '',
        buttonOpen: this.selected ? 'huge green' : 'basic small',
        buttonAdd: this.selected ? 'huge primary' : 'basic small',
        buttonEdit: this.selected ? 'huge orange' : 'basic small'
      }
    }

  },
  methods: {
    ...mapActions(['createTabs', 'getCurrentTab', 'toggleEditingWS', 'toggleSelectedWS']),
    selectWS () {
      this.toggleSelectedWS(this.ws.id)
    },
    openWS () {
      return false
    },
    editWS () {
      this.toggleSelectedWS(this.ws.id)
      this.toggleEditingWS(true)
    },
    async addCurrentTab () {
      const tab = await this.getCurrentTab()
      this.createTabs([{ ...tab, wsId: this.ws.id }])
    },
    cancel () {
      this.toggleSelectedWS(null)
      this.toggleEditingWS(false)
    }
  }
}
</script>

<style scoped>
.item {
  border-top: 1px solid #EEEEEE;
  padding: 20px 5px 5px 10px !important;
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
  padding-top: 30px !important;
}
.actions{
  text-align: right;
}
.selected .actions {
  padding: 0px 20px 0px 30px;
  margin-bottom: 40px;
}

h3 {
  margin-top: 2px !important;
  margin-bottom: 0px !important;
  cursor: pointer;
}
.tabs {
  padding: 0px 0px 30px 0px !important;
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
  width: 40px !important;
}
</style>
