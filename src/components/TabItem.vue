<template>
  <div class="ui basic segment">

    <TabControls :tab="tab" :class="['right floated']" />

    <img class="tab-icon" width="20px" height="20px" alt=" " :src="tab.favIconUrl" />

    <div class="tab-content">
      <h4 style="margin-bottom: 0px;">{{ tab.title | shorten(35) }}</h4>
      <p>{{ tab.url | shorten(40) }}</p>
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
  margin: 2px 5px 10px 0px;
  float: left;
}
p {
  font-size: 90%;
  color: #AAA;
}
</style>
