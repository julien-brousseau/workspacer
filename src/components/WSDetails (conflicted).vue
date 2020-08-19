<template>
  <div id="ws-view">

    <!-- Section title and main controls -->
    <h2>
      <button class="ui huge basic icon button" @click="cancel"><i class="caret left icon"></i></button>
      {{ editing ? workspace.title : 'Create new workspace' }}
    </h2>

    <!-- Loading screen until workspace available -->
    <ws-loading v-if="!workspace"></ws-loading>
    <div v-else class="ui items">

      <!-- Workspace create/edit form -->
      <div class="ui large form section">
        <label>Workspace name</label>
        <div class="inline field">
          <input type="text" v-model="workspace.title" style="width:80%">
          <button class="ui large green button" @click="submit" style="width:16%">
            {{ editing ? 'Save' : 'Create' }}
          </button>
        </div>
      </div>

    <!-- Tab list -->
    <ws-tab-list class="section"></ws-tab-list>
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
    ...mapGetters(['selectedWS', 'selectedWSData', 'editingWS']),
    editing () { return this.editingWS }
  },
  methods: {
    ...mapActions(['toggleSelectedWS', 'toggleAddingWS', 'toggleEditingWS', 'createOrUpdateWS']),

    init () {
      if (this.selectedWS) {
        this.workspace = { ...this.selectedWSData }
      } else {
        const rnd = Math.round(Math.random() * 99)
        this.workspace = { title: 'Workspace #' + rnd }
      }
    },

    //
    async submit (e) {
      // const tabs = this.tabs.map(t => {
      //   const { id, tempId, title, url } = t
      //   if (t.tempId) delete t.id
      //   delete t.tempId
      //   return t
      // })
      const error = await this.createOrUpdateWS(this.workspace)
      if (!error) this.cancel() // TODO: Show error
    },

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
.items {
  margin: 0px;
  padding: 20px 0px;
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-top: 5px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
  border-bottom: 2px solid rgb(33, 133, 208) !important;
}
.section {
  border-bottom: 1px solid #EEEEEE !important;
  padding: 25px 5px 15px 10px !important;
  margin: 0px !important;
}
label {
  font-weight: bold;
}
</style>
