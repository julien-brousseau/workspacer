<template>
  <div class="ui basic segment">

    <TabControls :tab="tab" :class="['right floated']" />

    <img class="tab-icon" width="35px" height="35px" alt=" " :src="tab.favIconUrl" />

    <div class="tab-content">
      <h4 style="margin-bottom: 0px;">{{ tab.title | shorten(30) }}</h4>
      <p>{{ tab.url | shorten(35) }}</p>
    </div>

  </div>
</template>

<script>
import TabControls from './TabControls.vue';

export default {
  components: { TabControls },
  props: ['tab']
};
</script>

<style scoped>
.segment:hover {
  background-color: rgb(250, 250, 250) !important;
}
.tab-controls {
  width: auto !important;
}
.tab-icon {
  margin: 5px 5px 10px 0px;
  float: left;
  padding: 6px;
  border: 1px solid #AAA;
}
</style>
