<template>
  <div class="ui segment" :class="{selected: selected}">

    <button
      class="ui icon primary button right floated"
      @click="false">
        Open</button>

    <button
      class="ui mini green icon button right floated"
      @click="addTabToWS(ws.id)">
        <i class="plus icon"></i></button>

    <a @click="selectWS(ws)" style="cursor: pointer;">
      <h3>{{ ws.title }} <small>({{ ws.tabs.length }} tabs)</small></h3></a>

    <div v-if="selected" class="tab-list">
      <div v-for="tab in ws.tabs" :key="tab.id" class="tab">

        <div class="ui buttons right floated">
          <button
            class="ui mini basic icon button"
            @click="pinTab(tab.id)">
              <i class="pin icon"></i></button>
          <button
            class="ui mini basic icon button"
            @click="editTab(tab.id)">
              <i class="pencil icon"></i></button>
          <button
            class="ui mini basic icon button"
            @click="deleteTab(tab.id)">
              <i class="trash icon"></i></button></div>

        <div class="content left floated">
          <h5>{{ tab.title }}</h5>
          <p><small>{{ tab.url }}</small></p></div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showTabs: false
    }
  },
  props: ['ws'],
  computed: {
    ...mapGetters(['selectedWS']),
    selected () {
      return this.ws === this.selectedWS
    }
  },
  methods: {
    ...mapActions(['addTabToWS', 'removeTabFromWS', 'toggleSelectedWS']),
    selectWS (ws) {
      this.toggleSelectedWS(ws)
    },
    deleteTab (id) {
      this.removeTabFromWS(id)
    },
    pinTab (id) {
    },
    editTab (id) {
    }
  }
}
</script>

<style scoped>
small {
  font-style: italic;
  font-size: 90%;
  /* color: #CCCCCC; */
}
.segment {
  padding: 25px 15px;
}
.tab-list {
  padding: 20px 0px 0px 10px;
}
.tab {
  padding: 15px;
  border: 1px solid #b2bfca;
  border-radius: 5px;
}
h5 {
  margin-bottom: 0px
}
.selected {
  background-color: #f1f7fc;
}

</style>
