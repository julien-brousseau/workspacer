<template>
  <div id="Workspaces">

    <!-- Section title and main controls -->
    <Header :title="'Workspaces'" :routes="routes" />

    <!-- No workspace message -->
    <div v-if="!workspaces.length" class="ui basic segment">
      You have no workspaces
    </div>

    <!-- Workspace list -->
    <WorkspaceItem v-else v-for="ws in workspaces"
      :key="ws.id"
      :ws="ws" />

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import WorkspaceItem from '../components/WorkspaceItem';

export default {
  components: { Header, WorkspaceItem },
  data () {
    return {
      routes: [
        { title: '', icon: 'cog', route: { name: 'Settings' } },
        { title: 'Create workspace', icon: 'plus', route: { name: 'CreateWorkspace' }, color: 'primary' }
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
