<template>
  <div id="TabForm">

    <!-- App header -->
    <Header :title="title" :routes="[{ title: 'Back', icon: 'caret left', route }]" />

    <!-- Tab form -->
    <form v-if="tab" class="ui form basic segment" @submit.prevent="submit">
      <div class="field">
        <label for="">Name</label>
        <input type="text" placeholder="Name" v-model="tab.title">
      </div>
      <div class="field">
        <label for="">URL</label>
        <input type="text" placeholder="URL" v-model="tab.url">
      </div>

      <button class="ui primary button" type="submit">
        Save changes
      </button>
    </form>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: { Header },
  data () {
    return { tab: null };
  },
  created () {
    // If id exists, it references the id of tab to fetch
    // Else, the param is wsId for a new tab
    const id = this.$route.params.id || null;
    this.tab = id
      ? { ...this.$store.getters.allTabs.find(t => t.Id === id) }
      : { title: 'New Tab', url: 'http://nowhere.com', wsId: this.$route.params.wsId };
  },
  computed: {
    route () {
      return { name: 'Workspace', params: { id: this.tab.wsId } };
    },
    title () {
      return this.$route.params.id ? 'Edit tab' : 'New tab';
    }
  },
  methods: {
    async submit () {
      if (this.$route.params.id) {
        await this.$store.dispatch('editTabs', [this.tab]);
      } else {
        await this.$store.dispatch('createTabs', { tabs: [{ ...this.tab }], wsId: this.$route.params.wsId });
      }
      this.$router.push(this.route);
    }
  }
};
</script>
