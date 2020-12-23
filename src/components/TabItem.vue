<template>
  <div class="ui basic segment">

    <!-- Up/Down buttons -->
    <div class="controls">
      <TabControls :tab="tab" />
    </div>

    <!-- Field controls -->
    <div class="ui buttons actions">
      <router-link :to="route" class="ui basic orange icon button">
        <i class="pencil icon"></i>
      </router-link>
      <button @click="removeTab" class="ui basic red icon button">
        <i class="trash icon"></i>
      </button>
    </div>

    <!-- Static fields -->
    <div>
      <img class="tab-icon" width="30px" height="30px" alt=" " :src="tab.favIconUrl" />
      <div class="tab-content">
        <h4 style="margin-bottom: 0px;">{{ tab.title | shorten(35) }}</h4>
        <p>{{ tab.url | shorten(40) }}</p>
      </div>
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
.segment:hover {
  background-color: rgb(250, 250, 250) !important;
}
.controls {
  float: left;
}
.actions {
  float: right;
}
.tab-icon {
  display:inline-block;
  margin-top: 10px
}
.tab-content {
  display:inline-block;
  margin-left: 8px;
}
</style>
