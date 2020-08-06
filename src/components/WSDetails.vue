<template>
  <div id="ws-view" class="ui attached segment">

    <h2>My workspaces > {{ editing ? workspace.title : 'New workspace' }}</h2>

    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else @submit.prevent class="ui large form">

      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.title">
      </div>

      <div class="field">
        <label>Included tabs</label>
        <ws-tab-list :tabs="workspace.tabs"></ws-tab-list>
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
import TabList from './items/TabList.vue'

export default {
  components: {
    wsLoading: Loading,
    wsTabList: TabList
  },
  data () {
    return {
      workspace: null
    }
  },
  computed: {
    ...mapGetters(['addingWS', 'selectedWS', 'editingWS', 'showTabs', 'newWS', 'selectedWSData']),
    editing () { return this.editingWS }
  },
  methods: {
    ...mapActions(['toggleSelectedWS', 'toggleAddingWS', 'toggleEditingWS', 'getAllTabsFromWindow', 'createWS', 'updateWS']),

    init () {
      this.editingTab = null
      if (this.selectedWS) {
        this.workspace = this.selectedWSData
      } else {
        const rnd = Math.round(Math.random() * 99)
        this.workspace = { title: 'Workspace #' + rnd, tabs: [] }
      }
    },

    addTab () {
      //
    },
    async addAllTabs () {
      // this.workspace.tabs = await this.getAllTabsFromWindow()
    },

    submit (e) {
      if (this.selectedWS) console.log('submit workspace :>> ', this.workspace) // this.updateWS(this.workspace)
      else this.createWS(this.workspace)
    },
    cancel () {
      this.toggleSelectedWS()
      this.toggleEditingWS(false)
      this.toggleAddingWS(false)
    }

    // @ Next
    // pinTab (id) {
    //   const pos = this.workspace.tabs.map((t, i) => { if (t.id === id) return i })
    //   console.log('pos :>> ', pos)
    // },

    // Will be useful someday
    // refreshTabsOrder () {

    // }

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
