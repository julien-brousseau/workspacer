<template>
  <div id="ws-view">

    <!-- Section title and main controls -->
    <h1>
      <router-link to="/" class="ui huge basic icon button">
        <i class="caret left icon"></i>
      </router-link>
      {{ editing ? 'Edit workspace' : 'Create new workspace' }}
    </h1>

    <!-- Loading screen until workspace available -->
    <Loading v-if="!workspace" />

    <div v-else class="ui ws" :class="{ editing }">

      <!-- Workspace create/edit form -->
      <h3>Workspace name</h3>
      <div class="ui big input" style="width: 100%; margin-bottom: 35px;">
        <input type="text" v-model="workspace.title" style="width:80%">
        <button @click="submit" class="ui large button green" :class="{ orange: editing }" style="margin-left: 10px; width: 90px;">
          {{ editing ? 'Save' : 'Create' }}
        </button>
      </div>

      <!-- Tab list -->
      <div v-if="editing">
        <h3>{{ selectedWSTabs.length ? 'This workspace contains the following tabs' : 'This workspace contains no tabs' }}</h3>
        <WSDetailsTabList />
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
  created () { this.init(); },
  data () { return { workspace: null }; },
  computed: {
    ...mapGetters(['selectedWS', 'selectedWSTabs']),
    editing () { return false; }
  },
  methods: {
    ...mapActions(['createOrUpdateWS']),
    // Assign {data.workspace} to current Workspace if selected, or a new empty {Workspace} with random name
    init () {
      const defaultWS = { title: 'Workspace #' + Math.round(Math.random() * 99) };
      this.workspace = (this.selectedWS) ? { ...this.selectedWS } : defaultWS;
    },
    // Dispatch {workspace} saving, then clear form
    async submit (e) {
      await this.createOrUpdateWS(this.workspace);
      this.$router.push('/');
    },
    // Clear the form display
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
.editing {
  border-color: orange !important;
}
</style>
