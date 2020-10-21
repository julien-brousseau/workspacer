<template>
  <div id="ws-list">

    <!-- Section title and main controls -->
    <h1>
      <router-link to="/settings" class="ui basic blue icon button right floated">
        <i class="cog icon"></i>
        Settings
      </router-link>
      <router-link to="/create" class="ui huge basic icon green button">
        <i class="plus icon"></i>
      </router-link>
      My Workspaces
    </h1>

    <!-- Workspaces -->
    <div class="ui items unstackable">
      <div v-if="!allWS.length" class="item empty">
        You have no workspaces
      </div>
      <WSListItem v-else v-for="ws in allWS"
        :key="ws.id"
        :ws="ws" />
    </div>

  </div>
</template>

<script>
import WSListItem from '../components/WSListItem';
import { mapGetters } from 'vuex';

export default {
  components: { WSListItem },
  computed: { ...mapGetters(['allWS']) }
};
</script>

<style scoped>
.items {
  margin: 0px;
}
.empty {
  padding: 25px 5px 15px 10px !important;
  margin: 0px !important;
}
</style>
