<template>
  <div class="ui items">

    <div v-for="tab in tabs" :key="tab.id" class="item" :class="{ selected: editing && editing.id === tab.id }">

      <!-- Index buttons -->
      <tab-controls></tab-controls>

      <!-- Editing fields -->
      <div v-if="editing && editing.id === tab.id" class="content edit">
        <div class="ui input" style="width:40%">
          <input type="text" placeholder="Title" v-model="tab.title">
        </div>
        <div class="ui input" style="width:59%;margin-left:5px;">
          <input type="text" placeholder="URL" v-model="tab.url">
        </div>
      </div>

      <!-- Static fields -->
      <div v-else class="content">
        <h4>{{ tab.title }}</h4>
        <p>{{ tab.url }}</p>
      </div>

      <!-- Field controls -->
      <div class="actions right floated">
        <div class="ui buttons">
          <button class="ui button icon basic large"
            @click="toggleEditTab(tab)"><i class="icon pencil"></i></button>
          <button class="ui button icon basic large"
            @click="deleteTab(tab)"><i class="icon trash"></i></button>
        </div>
      </div>

    </div>

    <div class="actions" style="margin-top:20px;">
      <button class="ui orange button" @click="createNewTab">Add tab</button>
      <button class="ui button" @click="addAllTabs">Add all tabs</button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TabControls from './items/TabControls.vue'
// import TabContent from './items/TabContent.vue'

export default {
  components: {
    tabControls: TabControls
    // tabContent: TabContent
  },

  data () {
    return {
      editing: null
    }
  },

  computed: {
    ...mapGetters(['selectedWS', 'allTabs', 'selectedWSTabs']),
    ws () { return this.selectedWS },
    tabs: {
      get () {
        const t = this.selectedWSTabs
        console.log('get :>> ', t)
        return t
      },
      set (tabs) {
        console.log('set :>> ', tabs)
        this.createOrUpdateTabs(tabs)
      }
    }
  },

  methods: {
    ...mapActions(['getCurrentTab', 'getAllTabsFromWindow', 'createOrUpdateTabs']),

    // Add a tab to the list containing the current tab info
    async createNewTab () {
      const { title, url } = await this.getCurrentTab()
      const fURL = url.slice(0, 30)
      return await this.createOrUpdateTabs([{ title, url: fURL, wsId: this.ws.id }])
    },

    //
    // updateTab (tab) {
    //   this.createOrUpdateTabs(tab)
    // },

    // Add all current window's tabs
    async addAllTabs () {
      // const windowTabs = await this.getAllTabsFromWindow()
      // this.tabs = [...this.tabs, ...windowTabs.map(t => { return { ...t, tempId: true } })]
    },

    toggleEditTab (tab) {
      this.editing = this.editing === tab ? null : tab
    },
    // saveTab (id) {
    //   // Save tab code...
    //   this.selectedTab = null
    // },
    // cancel () {
    //   this.selectedTab = null
    // },
    deleteTab (tab) {
      console.log('deleteTab :>> ', tab)
      // this.tabs = this.tabs.filter(t => t.id !== deleteId)
    }
  }
}
</script>

<style scoped>
.item {
  border-top: 1px solid #EEEEEE !important;
  padding: 5px 5px 10px 5px !important;
  margin: 0px !important;
}
.edit {
  margin-top: 13px !important;
}
.actions {
  margin-top: 6px;
}
.item:hover {
  color: orange !important;
  background-color: rgb(255, 253, 249);
  border-top: 1px solid orange !important;
  border-bottom: 1px solid orange !important;
}
.selected {
  background-color: rgb(255, 253, 249);
  border-top: 1px solid orange !important;
  border-bottom: 1px solid orange !important;
}
</style>
