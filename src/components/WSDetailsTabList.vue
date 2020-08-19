<template>
  <div class="ui form">

    <div class="field">
      <label>Tabs</label>
    </div>

    <div class="ui items">
      <div v-for="tab in tabs" :key="tab.id" class="item" :class="{ selected: editing && editing.id === tab.id }">

        <!-- <tab-controls></tab-controls> -->

        <div v-if="editing && editing.id === tab.id" class="content edit">
          <div class="fields">
            <div class="six wide field">
              <input type="text" placeholder="Title" v-model="tab.title">
            </div>
            <div class="ten wide field">
              <input type="text" placeholder="URL" v-model="tab.url">
            </div>
          </div>
        </div>

        <div v-else class="content">
          <h4>{{ tab.title }}</h4>
          <p>{{ tab.url }}</p>
        </div>

        <div class="actions right floated">
          <div class="ui buttons">
            <button class="ui button icon basic large"
              v-if="!editing || editing.id !== tab.id"
              @click="editTab(tab)">
                <i class="icon pencil"></i></button>
            <button class="ui button icon basic large"
              @click="deleteTab(tab)">
                <i class="icon trash"></i></button>
          </div>
        </div>

      </div>
    </div>

    <div class="actions" style="margin-top:20px;">
      <button class="ui button" @click="addTab">Add tab</button>
      <button class="ui primary button" @click="addAllTabs">Add all tabs</button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import TabControls from './items/TabControls.vue'
// import TabContent from './items/TabContent.vue'

export default {
  components: {
    // tabControls: TabControls
    // tabContent: TabContent
  },
  data () {
    return {
      editing: null
    }
  },
  computed: {
    ...mapGetters(['selectedWSData', 'allTabs']),
    ws () { return this.selectedWSData },
    tabs () { return this.allTabs.filter(t => t.wsId === this.ws.id) }
  },
  methods: {
    ...mapActions(['getCurrentTab', 'getAllTabsFromWindow', 'createTabs']),

    // Add current tab
    async addTab () {
      const { title, url } = await this.getCurrentTab()
      this.createTabs([{ title, url: url.slice(0, 30), wsId: this.ws.id }])
        .then(tab => {
          this.editing = tab
        })
        .catch(e => console.log('Error > addTab :>> ', e))
    },

    // Add all current window's tabs
    async addAllTabs () {
      // const windowTabs = await this.getAllTabsFromWindow()
      // this.tabs = [...this.tabs, ...windowTabs.map(t => { return { ...t, tempId: true } })]
    },

    // tabSelected (id) {
    // return this.selectedTab === id
    // },
    editTab (tab) {
      this.editing = tab
    },
    // saveTab (id) {
    //   // Save tab code...
    //   this.selectedTab = null
    // },
    // cancel () {
    //   this.selectedTab = null
    // },
    deleteTab (deleteId) {
      // this.tabs = this.tabs.filter(t => t.id !== deleteId)
    }
    // moveTab (id, direction) {
    //
    // }
    // pinTab (id) {
    //
    // }
  }
}
</script>

<style scoped>
.item {
  border-top: 1px solid #EEEEEE !important;
  padding: 5px !important;
  margin: 0px !important;
}
.edit {
  margin-top: 13px !important;
}
.actions {
  margin-top: 6px;
}
.item:hover {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
}
.selected {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
}
h4 {
  margin-top: 10px !important;
}
</style>
