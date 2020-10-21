<template>
  <div id="ws-view">

    <!-- Section title and main controls -->
    <h1>
      <router-link to="/" class="ui huge basic icon button">
        <i class="caret left icon"></i>
      </router-link>
      {{ updating ? 'Edit workspace' : 'Create new workspace' }}
    </h1>

    <!-- Loading screen until workspace available -->
    <Loading v-if="!workspace" />

    <div v-else class="ui ws" :class="{ updating }">

      <!-- Workspace create/edit form -->
      <h3>Workspace name</h3>
      <div class="ui big input" style="width: 100%; margin-bottom: 35px;">
        <input type="text" v-model="workspace.title" style="width:80%">
        <button @click="submit" class="ui large button green" :class="{ orange: updating }" style="margin-left: 10px; width: 90px;">
          {{ updating ? 'Save' : 'Create' }}
        </button>
      </div>

      <!-- Tab list -->
      <div v-if="updating">
        <h3>{{ tabs.length ? 'This workspace contains the following tabs' : 'This workspace contains no tabs' }}</h3>
        <WSDetailsTabList :wsId="workspace.id" />
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '../components/items/Loading.vue';
import WSDetailsTabList from '../components/WSDetailsTabList.vue';

export default {
  components: { Loading, WSDetailsTabList },
  data () { return { workspace: null }; },
  created () {
    const defaultWS = { title: 'Workspace #' + Math.round(Math.random() * 99) };
    this.workspace = this.updating ? { ...this.allWS.find(ws => ws.id === this.updating) } : defaultWS;
    console.log('this.workspace :>> ', this.updating);
  },
  computed: {
    ...mapGetters(['allTabs', 'allWS']),
    updating: function () {
      return this.$route.params.id || null;
    },
    tabs: function () {
      if (!this.workspace.id) return null;
      return this.allTabs.filter(t => t.wsId === this.workspace.id);
    }
  },
  methods: {
    ...mapActions(['createOrUpdateWS']),
    async submit (e) {
      await this.createOrUpdateWS(this.workspace);
      this.$router.push('/');
    },
    cancel () {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.ws {
  margin: 0px;
  padding: 20px;
  border-color: green !important;
  border-left: 7px solid;
  border-top: 5px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
}
label {
  display: block;
  margin: 5px 0px !important;
  font-weight: bold;
}
.updating {
  border-color: orange !important;
}
</style>
