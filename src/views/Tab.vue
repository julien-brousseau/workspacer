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

      <button class="ui basic secondary button" type="submit">
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
    this.tab = { ...this.$store.getters.allTabs.find(t => t.Id === this.$route.params.id) };
  },
  computed: {
    route () {
      return { name: 'Tabs', params: { wsId: this.tab.wsId } };
    }
  },
  methods: {
    async submit () {
      await this.$store.dispatch('editTabs', [this.tab]);
      this.$router.push(this.route);
    }
  }
};
</script>
