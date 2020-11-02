<template>
  <div class="ui basic segment">

    <!-- Up/Down buttons -->
    <div class="controls">
      <TabControls :tab="tab" />
    </div>

    <!-- Field controls -->
    <div class="ui buttons actions">
      <router-link :to="route" class="ui basic secondary icon button">
        <i class="pencil icon"></i>
      </router-link>
      <button @click="removeTab" class="ui basic secondary icon button">
        <i class="trash icon"></i>
      </button>
    </div>

    <!-- Static fields -->
    <div class="">
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
    route () {
      return { name: 'Tab', params: { id: this.tab.Id } };
    }
  },
  methods: {
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
</style>
