<template>
  <div id="ws-view" class="ui attached segment">

    <h2>My workspaces > {{ editing ? workspace.title : 'New workspace' }}</h2>

    <ws-loading v-if="!workspace"></ws-loading>

    <div v-else @submit.prevent="submit" class="ui large form section">
      <label>Workspace name</label>
      <div class="inline field">
        <input type="text" v-model="workspace.title" style="width:80%">
        <button class="ui large green button"
          @click="submit">
            {{ editing ? 'Save' : 'Create' }}</button>
      </div>
    </div>

    <ws-tab-list class="section"></ws-tab-list>

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
#ws-view {
  padding: 10px 0px 0px 0px;
}
.section {
  padding: 20px;
}
label {
  font-weight: bold;
}
</style>
