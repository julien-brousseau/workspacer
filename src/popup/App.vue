<template>
  <div id="app">
    <Loading v-if="loading" />
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Loading from '../components/items/Loading.vue';

export default {
  components: { Loading },
  created () {
    this.$store.dispatch('loadWS');
    this.$router.push('/');
  },
  computed: {
    loading () {
      return this.$store.getters.allWS === null || this.$store.getters.allTabs === null;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50 !important;
  margin: 0px;
  width: 400px !important;
  min-width: 400px !important;
  height: auto !important;
  min-height: 500px !important;
}

/* Section title */
h1 {
  border-bottom: 1px solid #CCCCCC;
  padding: 20px;
  margin-bottom: 0px !important;
}

/* Other */
.segment {
  padding: 16px !important;
  margin: 0px !important;
  border-bottom: 1px solid #EEE !important;
}

</style>
