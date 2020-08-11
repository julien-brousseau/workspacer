<template>
  <div id="ws-view" class="ui attached segment">

    <h2>My workspaces > {{ editing ? workspace.title : 'New workspace' }}</h2>

    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else @submit.prevent="submit" class="ui large form">

      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.title" required>
      </div>

      <div class="field">
        <label>Included tabs</label>
        <ws-tab-list :tabs="tabs"></ws-tab-list>
        <div class="actions" style="margin-top:20px;">
          <button class="ui button" @click="addTab">Add tab</button>
          <button class="ui primary button" @click="addAllTabs">Add all tabs</button>
        </div>
      </div>

      <button class="ui large button right floated" @click="cancel">Cancel</button>
      <button class="ui large green button right floated" @click="submit">{{ editing ? 'Save' : 'Create' }}</button>

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
      workspace: null,
      tabs: null,
      newTab: null
    }
  },
  computed: {
    ...mapGetters(['addingWS', 'selectedWS', 'editingWS', 'showTabs', 'newWS', 'selectedWSData', 'allTabs']),
    editing () { return this.editingWS }
  },
  methods: {
    ...mapActions(['toggleSelectedWS', 'toggleAddingWS', 'toggleEditingWS', 'getAllTabsFromWindow', 'createOrUpdateWS', 'updateWS', 'getCurrentTab']),

    init () {
      this.newTab = null
      if (this.selectedWS) {
        this.workspace = { ...this.selectedWSData }
        this.tabs = this.allTabs.filter(t => t.wsId === this.workspace.id)
      } else {
        const rnd = Math.round(Math.random() * 99)
        this.workspace = { title: 'Workspace #' + rnd }
        this.tabs = []
      }
    },

    // Add an empty tab
    async addTab () {
      const id = Math.round(Math.random() * 99) + 1000
      const { title, url } = await this.getCurrentTab()
      this.tabs.push({ id, title, url, tempId: true }) // The tempId flag indicates which ids must be removed upon saving to generate new ones
    },

    // Add all current window's tabs
    async addAllTabs () {
      const windowTabs = await this.getAllTabsFromWindow()
      this.tabs = [...this.tabs, ...windowTabs.map(t => { return { ...t, tempId: true } })]
    },

    //
    async submit (e) {
      const tabs = this.tabs.map(t => {
        const { id, tempId, title, url } = t
        if (t.tempId) delete t.id
        delete t.tempId
        return t
      })
      const error = await this.createOrUpdateWS({ ws: this.workspace, tabs })
      if (!error) this.cancel()
    },

    cancel () {
      this.toggleSelectedWS()
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
#ws-view {
  padding: 10px 0px 0px 0px;
}
.form {
  padding: 20px;
}
.tab {
  padding-bottom: 15px !important;
  padding-top: 15px !important;
}
.actions {
  margin-top: -3px;
}
/* .column {
  overflow-wrap: break-word;
  word-wrap: break-word;
} */

/* Element */
.item {
  border-top: 1px solid #EEEEEE;
  padding: 20px 5px 5px 10px !important;
  margin: 0px !important;
}
.item:hover {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
/*   color: blue; */
}
</style>
