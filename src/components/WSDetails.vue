<template>
  <div id="ws-view">

    <!-- Section title and main controls -->
    <h1>
      <button class="ui huge basic icon button" @click="cancel"><i class="caret left icon"></i></button>
      {{ editing ? workspace.title : 'Create new workspace' }}
    </h1>

    <!-- Loading screen until workspace available -->
    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else class="ui ws">

      <!-- Workspace create/edit form -->
      <label>Workspace name</label>
      <div class="ui large input" style="width: 100%; margin-bottom: 15px;">
        <input type="text" v-model="workspace.title" style="width:80%">
        <button class="ui large orange button" @click="submit" style="margin-left: 10px; width: 90px;">
          {{ editing ? 'Save' : 'Create' }}
        </button>
      </div>

      <!-- Tab list -->
      <div v-if="editing">
        <label>Workspace included tabs</label>
        <ws-tab-list></ws-tab-list>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from './items/Loading.vue'
import WSDetailsTabList from './WSDetailsTabList.vue'

export default {
  components: {
    wsLoading: Loading,
    wsTabList: WSDetailsTabList
  },

  data () {
    return {
      workspace: null
    }
  },

  computed: {
    ...mapGetters(['selectedWS', 'editingWS']),
    editing () { return this.editingWS }
  },

  methods: {
    ...mapActions(['toggleSelectedWS', 'toggleAddingWS', 'toggleEditingWS', 'createOrUpdateWS']),

    // Assign the selected/new WS data
    init () {
      if (this.selectedWS) {
        this.workspace = { ...this.selectedWS }
      } else {
        const rnd = Math.round(Math.random() * 99)
        this.workspace = { title: 'Workspace #' + rnd }
      }
    },

    // Create/edit the current WS data
    async submit (e) {
      const id = await this.createOrUpdateWS(this.workspace)
      this.cancel()
    },

    // Clear the form display variables
    cancel () {
      this.toggleSelectedWS(null)
      this.toggleEditingWS(false)
      this.toggleAddingWS(false)
    }
  },

  created () {
    this.init()
  }

}
</script>

<style scoped>
.ws {
  margin: 0px;
  padding: 20px;
  border-left: 7px solid orange !important;
  border-top: 5px solid orange !important;
  border-right: 2px solid orange !important;
  border-bottom: 2px solid orange !important;
}
label {
  display: block;
  margin: 5px 0px !important;
  font-weight: bold;
}
</style>
