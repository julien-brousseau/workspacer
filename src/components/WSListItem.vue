<template>
  <div class="ui segment" :class="{selected: selected}">

    <button
      class="ui mini green icon button right floated"
      @click="addTabToWS(ws.name)">
        <i class="plus icon"></i></button>

    <a @click="selectWS(ws)" style="cursor: pointer;">
      <h3>{{ ws.name }} ({{ ws.tabs.length }} tabs)</h3></a>

    <div v-if="selected" class="tab-list">
      <div v-for="tab in ws.tabs" :key="tab.id" class="tab">

        <div class="ui buttons right floated">
          <button
            class="ui mini basic orange icon button"
            @click="false">
              <i class="pin icon"></i></button>
          <button
            class="ui mini basic primary icon button"
            @click="false">
              <i class="pencil icon"></i></button>
          <button
            class="ui mini basic red icon button"
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
    ...mapActions(['addTabToWS', 'toggleSelectedWS']),
    selectWS (ws) { this.toggleSelectedWS(ws) },
    deleteTab (id) {
      this.ws.tabs = this.ws.tabs.filter(t => t.id !== id)
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
