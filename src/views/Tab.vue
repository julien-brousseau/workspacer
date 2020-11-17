<template>
  <div id="TabForm">

    <!-- App header -->
    <Header :title="'Edit tab'" :routes="[{ title: 'Back', icon: 'caret left', route }]" />

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
import Header from '@/components/items/Header.vue';

export default {
  components: { Header },
  data () {
    return { tab: null };
  },
  created () {
    const id = this.$route.params.id || null;
    this.tab = id
      ? { ...this.$store.getters.allTabs.find(t => t.Id === id) }
      : { title: 'New Tab', url: 'http://nowhere.com', wsId: this.$route.params.wsId };
  },
  computed: {
    route () {
      return { name: 'Tabs', params: { wsId: this.tab.wsId } };
    }
  },
  methods: {
    async submit () {
      if (this.$route.params.id) { await this.$store.dispatch('editTabs', [this.tab]); } else { await this.$store.dispatch('createTabs', { tabs: [{ ...this.tab }], wsId: this.$route.params.wsId }); };
      this.$router.push(this.route);
    }
  }
};
</script>
