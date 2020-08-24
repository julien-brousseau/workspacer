<template>
  <div id="ws-view">

    <!-- Section title and main controls -->
    <h1>
      <button class="ui huge basic icon button" @click="cancel"><i class="caret left icon"></i></button>
      {{ editing ? workspace.title : 'Create new workspace' }}
    </h1>

    <!-- Loading screen until workspace available -->
    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else class="ui ws" :class="{ editing }">

      <!-- Workspace create/edit form -->
      <h3>Workspace name</h3>
      <div class="ui big input" style="width: 100%; margin-bottom: 35px;">
        <input type="text" v-model="workspace.title" style="width:80%">
        <button class="ui large button green" :class="{ orange: editing }" @click="submit" style="margin-left: 10px; width: 90px;">
          {{ editing ? 'Save' : 'Create' }}
        </button>
      </div>

      <!-- Tab list -->
      <div v-if="editing">
        <h3>{{ selectedWSTabs.length ? 'Workspace included tabs' : 'This workspace contains no tabs' }}</h3>
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
    ...mapGetters(['selectedWS', 'editingWS', 'selectedWSTabs']),
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
      await this.createOrUpdateWS(this.workspace)
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
  border-color: green !important;
  border-left: 7px solid;
  border-top: 5px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
}
label {
  display: block;
  margin: 5px 0px !important;
  font-weight: bold;
}
.editing {
  border-color: orange !important;
}
</style>
