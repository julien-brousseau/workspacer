<template>
  <div id="Form">

    <!-- Section title and main controls -->
    <h1>
      <router-link :to="backRoute" class="ui basic icon secondary button right floated">
        <i class="caret left icon"></i>Back
      </router-link>
      {{ id ? 'Edit Workspace' : 'New workspace' }}
    </h1>

    <!-- Workspace form -->
    <form class="ui form basic segment" @submit.prevent="submit">
      <div class="field">
        <label>Workspace name</label>
        <input type="text" v-model="workspace.title" placeholder="Ex: School">
      </div>

      <button class="ui basic secondary button" type="submit">
        {{ id ? 'Save changes' : 'Create workspace' }}
      </button>
    </form>

  </div>
</template>

<script>
export default {
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
    // Back button route - List if new || Workspace/id
    backRoute () {
      const { id } = this;
      return id ? { name: 'Workspace', params: { id } } : { name: 'List' };
    }
  },
  methods: {
    // Save {workspace} in Store and return to Workspace page
    async submit (e) {
      await this.$store.dispatch('createOrUpdateWS', this.workspace);
      this.$router.push(this.backRoute);
    }
  }
};
</script>

<style scoped>
</style>
