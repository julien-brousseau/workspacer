<template>
  <div id="List">

    <!-- Section title and main controls -->
    <h1>
      <router-link :to="{ name: 'Settings' }" class="ui basic secondary icon button right floated">
        <i class="cog icon"></i>
      </router-link>
      <router-link :to="{ name: 'Create' }" class="ui basic secondary icon button right floated">
        <i class="plus icon"></i>
      </router-link>
      My Workspaces
    </h1>

    <!-- Workspaces -->
    <div v-if="!workspaces.length" class="ui basic segment empty">
      You have no workspaces
    </div>
    <ListItem v-else v-for="ws in workspaces"
      :key="ws.id"
      :ws="ws" />

  </div>
</template>

<script>
import ListItem from '../components/ListItem';

export default {
  components: { ListItem },
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
