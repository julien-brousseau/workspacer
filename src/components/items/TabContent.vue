<template>
  <div>
      <!-- Index buttons -->
      <tab-controls></tab-controls>

    <!-- Editing fields -->
    <div v-if="editing" class="content edit">
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
          @click="toggleEditTab()"><i class="icon pencil"></i></button>
        <button class="ui button icon basic large"
          @click="deleteTab()"><i class="icon trash"></i></button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TabControls from './TabControls.vue'

export default {
  components: {
    tabControls: TabControls
  },

  props: ['tab', 'editing'],

  methods: {
    ...mapActions(['setEditingTab']),
    toggleEditingTab () {
      console.log('toggleEditingTab :>> ')
      // this.setEditingTab(this.tab.id)
    },
    deleteTab () {
      console.log('deleteTab :>> ')
      // this.tabs = this.tabs.filter(t => t.id !== deleteId)
    }
  }
}
</script>
