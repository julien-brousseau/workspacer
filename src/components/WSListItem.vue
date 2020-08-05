<template>
  <div class="item" :class="{selected: selected}">

    <div class="image" style="width:auto;"><div class="ui basic grey label">{{ ws.tabs.length }}</div></div>

    <div class="content">
      <h3 @click="selectWS(ws)"><i class="ui caret icon" :class="[selectedCaret]"></i>{{ ws.title }}</h3>
      <ul v-if="selected" class="tabs">
        <li class="tab header">Included tabs</li>
        <li class="tab" v-for="tab in ws.tabs" :key="tab.id" >{{ tab.title }}</li>
      </ul>
    </div>

    <div class="actions right floated">
      <div class="ui buttons" :class="[cls.buttons]">
        <button class="ui button icon" :class="[cls.buttonOpen]">
          <i class="icon sticky note"></i>{{ selected ? 'Open workspace' : '' }}</button>
        <button class="ui button icon" :class="[cls.buttonAdd]" @click="addTabToWS(ws.id)">
          <i class="icon plus"></i>{{ selected ? 'Add current tab' : '' }}</button>
        <button class="ui button icon" :class="[cls.buttonEdit]">
          <i class="icon pencil"></i>{{ selected ? 'Edit workspace' : '' }}</button>
      </div>
    </div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['ws'],
  data () {
    return {
      showTabs: false
    }
  },
  computed: {
    ...mapGetters(['selectedWS']),
    selected () { return this.ws === this.selectedWS },
    selectedCaret () { return this.selected ? 'down' : 'right' },
    cls () {
      return {
        buttons: this.selected ? 'vertical labeled icon' : '',
        buttonOpen: this.selected ? 'big labeled green' : 'basic large',
        buttonAdd: this.selected ? 'small labeled primary' : 'basic large',
        buttonEdit: this.selected ? 'small labeled grey' : 'basic large'
      }
    }
  },
  methods: {
    ...mapActions(['addTabToWS', 'removeTabFromWS', 'toggleSelectedWS']),
    selectWS (ws) { this.toggleSelectedWS(ws) }
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
