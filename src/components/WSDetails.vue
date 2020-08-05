<template>
  <div id="ws-view" class="ui attached segment">

    <h2>My workspaces > Create new workspace/Name</h2>

    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else @submit.prevent class="ui large form">

      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.title">
      </div>

      <div class="ui field items">
        <label>Included tabs</label>

        <div v-for="tab in workspace.tabs" :key="tab.id" class="item tab">
          <button class="ui button icon basic"><i class="icon pin"></i></button>
          <div class="ui vertical buttons" style="margin-right: 10px;">
            <button class="ui mini button icon basic"
                    style="margin:0px;padding:2px;">
              <i class="icon caret up"></i></button>
            <button class="ui mini button icon basic"
                    style="margin:0px;padding:2px;">
              <i class="icon caret down"></i></button>
          </div>

          <!-- <div class="content ui relaxed grid">
              <input class="six wide column" type="text" placeholder="Name" v-model="tab.title">
              <input class="nine wide column" type="text" placeholder="URL" v-model="tab.url">
          </div> -->

          <div class="content">
            <h4>{{ tab.title }}</h4>
            <p>{{ tab.url }}</p>
          </div>

          <div class="actions right floated">
            <div class="ui buttons">
              <button class="ui button icon basic large" @click="editTab(tab.id)">
                <i class="icon pencil"></i></button>
              <button class="ui button icon basic large" @click="deleteTab(tab.id)">
                <i class="icon trash"></i></button>
            </div>
          </div>
        </div>

        <div class="actions" style="margin-top:20px;">
          <button class="ui button" @click="addTab">Add tab</button>
          <button class="ui primary button" @click="addAllTabs">Add all tabs</button>
        </div>

    </div>

    <button class="ui large button right floated" @click="cancel">Cancel</button>
    <button class="ui large green button right floated" @click="submit">Create/save</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from './items/Loading.vue'

export default {
  components: {
    wsLoading: Loading
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
    async init () {
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
    deleteTab (id) {
      this.workspace.tabs = this.workspace.tabs.filter(t => t.id !== id)
    },
    submit (e) {
      if (this.selectedWS) this.updateWS(this.workspace)
      else this.createWS(this.workspace)
    },
    cancel () {
      this.toggleSelectedWS(null)
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
