<template>
  <div id="ws-view" class="ui attached segment">

    <h2>My workspaces > Create new workspace/Name</h2>

    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else @submit.prevent class="ui large form">

      <div class="fields">
        <div class="field ten wide column">
          <label>Workspace name</label>
          <input type="text" v-model="workspace.title">
        </div>
        <div class="field six wide column" style="text-align:right;">
          <label>&nbsp;</label>
          <button class="ui large green button" @click="submit">Create/save</button>
          <button class="ui large button" @click="toggleAddingWS">Cancel</button>
        </div>
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
          <div class="content">
            <h4>{{ tab.title }}</h4>
            <p>{{ tab.url }}</p>
          </div>
          <div class="actions right floated">
            <div class="ui buttons">
              <button class="ui button icon basic large">
                <i class="icon pencil"></i></button>
              <button class="ui button icon basic large" @click="deleteTab(tab.id)">
                <i class="icon trash"></i></button>
            </div>
          </div>
        </div>

        <div class="actions" style="margin-top:20px;">
          <button class="ui button">Add tab</button>
          <button class="ui green button">Add all tabs</button>
        </div>

    </div>
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
    ...mapGetters(['addingWS', 'showTabs', 'newWS'])
  },
  methods: {
    ...mapActions(['toggleAddingWS', 'getAllTabsFromWindow', 'createWS']),
    async init () {
      const rnd = Math.round(Math.random() * 99)
      this.workspace = { title: 'Workspace #' + rnd, tabs: [] }
      // if (this.showTabs) this.workspace.tabs = await this.getAllTabsFromWindow()
    },
    submit (e) {
      this.createWS(this.workspace)
    },
    deleteTab (id) {
      this.workspace.tabs = this.workspace.tabs.filter(t => t.id !== id)
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
</style>
