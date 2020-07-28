<template>

  <div v-if="addingWS" class="ui attached segment form">

    <div class="field">
      <input type="text" v-model="ws.name"></div>

    <div class="field ui grid" v-if="showTabs">

      <div class="one wide column">
        <i class="file outline icon"></i></div>
      <div class="four wide column">
        Firefox</div>
      <div class="six wide column">
        http://www.blop.com</div>
      <div class="two wide column">
        <div class="ui toggle checkbox" v-if="showTabs">
          <input type="checkbox" v-model="showTabs" />
          <label></label></div></div>
      <div class="two wide column">
        <button class="ui compact icon red button">
          <i class="trash icon"></i></button></div>

    </div>

    <button
      class="ui large primary button"
      @click="createWS">
        Create</button>
    <button
      class="ui button"
      @click="toggleAddingWS">
        Cancel</button>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const baseWS = { name: 'Workspace 1' }

export default {
  data () {
    return {
      ws: baseWS
    }
  },
  computed: {
    ...mapGetters(['addingWS', 'showTabs'])
  },
  methods: {
    ...mapActions(['addWS', 'toggleAddingWS', 'toggleShowTabs']),
    init () {},
    createWS () {
      // this.addWS(this.ws)
      this.ws = baseWS
      this.toggleShowTabs()
      this.toggleAddingWS()
    }
  }
}
</script>
