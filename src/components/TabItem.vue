<template>
  <div class="ui basic segment">

    <!-- Up/Down buttons -->
    <div class="controls">
      <TabControls :tab="tab" />
    </div>

    <!-- Field controls -->
    <div class="ui buttons actions">
      <button class="ui basic secondary icon button" @click="selectTab">
        <i class="icon" :class="selected ? 'save' : 'pencil'"></i>
      </button>
      <button v-if="!selected" class="ui basic secondary icon button" @click="removeTab">
        <i class="trash icon"></i>
      </button>
    </div>

    <!-- Editing fields -->
    <form v-if="selected" class="ui form">
      <div class="field">
        <label for="">Name</label>
        <input type="text" placeholder="Title" v-model="tab.title">
      </div>
      <div class="field">
        <label for="">URL</label>
        <input type="text" placeholder="URL" v-model="tab.url">
      </div>
    </form>

    <!-- Static fields -->
    <div v-else class="">
      <h4 class="header">{{ tab.title | shorten(40) }}</h4>
      <p class="url">{{ tab.url | shorten(40) }}</p>
    </div>

  </div>
</template>

<script>
import TabControls from './items/TabControls.vue';

export default {
  components: { TabControls },
  props: ['tab'],
  computed: {
    selected () {
      return this.$store.getters.selectedTab === this.tab.Id;
    },
    locked () {
      return this.$store.dispatch('tabIsLocked', this.tab.Id);
    }
  },
  methods: {
    selectTab () {
      this.$store.dispatch('selectTab', this.tab.Id);
    },
    removeTab () {
      this.$store.dispatch('deleteTab', this.tab.Id);
    }
  }
};
</script>

<style scoped>
.controls {
  float: left;
}
.actions {
  float: right;
}
.form {
  width: 75%;
  display: inline-block;
}
</style>
