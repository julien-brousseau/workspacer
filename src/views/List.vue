<template>
  <div id="List">

    <!-- App header -->
    <Header :title="'Workspaces'" :routes="routes" />

    <!-- No workspace message -->
    <div v-if="!workspaces.length" class="ui basic segment empty">
      You have no workspaces
    </div>

    <!-- Workspace list -->
    <ListItem v-else v-for="ws in workspaces"
      :key="ws.id"
      :ws="ws" />

  </div>
</template>

<script>
import Header from '@/components/items/Header.vue';
import ListItem from '../components/ListItem';

export default {
  components: { Header, ListItem },
  data () {
    return {
      routes: [
        { title: '', icon: 'cog', route: { name: 'Settings' } },
        { title: 'Create workspace', icon: 'plus', route: { name: 'Create' }, color: 'primary' }
      ]
    };
  },
  computed: {
    workspaces () {
      return this.$store.getters.allWS;
    }
  }
};
</script>

<style scoped>
.empty {
  padding-top: 15px !important;
  padding-bottom: 20px !important;
  border: 0px none !important;
}
</style>
