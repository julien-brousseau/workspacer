<template>
  <div id="WorkspaceForm">

    <!-- Section title and main controls -->
    <Header :title="title" :routes="[{ title: 'Back', icon: 'caret left', route }]" />

    <!-- Workspace form -->
    <form class="ui form basic segment" @submit.prevent="submit">

      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.title" placeholder="Ex: School">
      </div>

      <button class="ui primary button" type="submit">
        {{ id ? 'Save changes' : 'Create workspace' }}
      </button>
    </form>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: { Header },
  data () {
    return {
      id: null,
      workspace: null
    };
  },
  created () {
    // Set id and {workspace} data
    this.id = this.$route.params.id || null;
    this.workspace = this.id
      ? { ...this.$store.getters.allWS.find(ws => ws.id === this.id) }
      : { title: 'New Workspace' };
  },
  computed: {
    // Back button route - Workspaces if new || Workspace/id
    route () {
      const { id } = this;
      return id ? { name: 'Workspace', params: { id } } : { name: 'Workspaces' };
    },
    title () {
      return this.id ? 'Edit Workspace' : 'New workspace';
    }
  },
  methods: {
    // Save {workspace} in Store and return to Workspace page
    async submit (e) {
      await this.$store.dispatch('createOrUpdateWorkspace', this.workspace);
      this.$router.push(this.route);
    }
  }
};
</script>
