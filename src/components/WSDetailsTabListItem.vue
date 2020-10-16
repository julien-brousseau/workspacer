<template>
  <div class="item" :class="{ selected: editing }">

    <!-- Index buttons -->
    <tab-controls :tab="tab"></tab-controls>

    <!-- Static fields -->
    <div v-if="!editing" class="content">
      <h4>{{ tab.title | shorten(60) }}</h4>
      <p>{{ tab.url | shorten }}</p>
    </div>

    <!-- Editing fields -->
    <div v-else class="content edit" style="margin-top: 10px !important">
      <div class="ui input" style="width:40%">
        <input type="text" placeholder="Title" v-model="tabForm.title">
      </div>
      <div class="ui input" style="width:59%;margin-left:5px;">
        <input type="text" placeholder="URL" v-model="tabForm.url">
      </div>
    </div>

    <!-- Field controls -->
    <div class="actions right floated">
      <div class="ui buttons">
        <button class="ui button icon basic large"
          @click="toggleEditingTab()">
            <i class="icon" :class="editing ? 'save' : 'pencil'"></i>
        </button>
        <button class="ui button icon basic large"
          @click="editing ? cancel() : removeTab()">
            <i class="icon" :class="editing ? 'cancel' : 'trash'"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TabControls from './items/TabControls.vue';

export default {
  components: {
    tabControls: TabControls
  },
  data () { return { tabForm: null }; },
  props: ['tab'],
  created () { this.init(); },

  computed: {
    ...mapGetters(['editingTab']),
    editing () { return this.editingTab === this.tab.Id; }
  },

  methods: {
    ...mapActions(['setEditingTab', 'editTabs', 'deleteTab']),
    init () {
      this.tabForm = { ...this.tab };
      this.setEditingTab();
    },
    toggleEditingTab () {
      if (this.editingTab !== this.tab.Id) {
        this.init();
        this.setEditingTab(this.tab.Id);
      } else {
        this.editTabs([this.tabForm]);
        this.init();
      }
    },
    removeTab () {
      this.deleteTab(this.tab.Id);
    },
    cancel () {
      this.init();
    }
  }
};
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
.actions {
  margin-top: 6px;
}
</style>
