<template>
  <div id="Workspace">

    <!-- Section title and main controls -->
    <h1>
      <router-link to="/" class="ui basic icon button right floated">
        <i class="caret left icon"></i>Back
      </router-link>
      {{ wsId ? 'Workspace details' : 'New workspace' }}
    </h1>

    <!-- Workspace info -->
    <div class="ui basic segment">
      <button class="ui basic icon button right floated btn-rename"><i class="pencil icon"></i></button>
      <p class="label">Workspace name</p>
      <h3 class="ui header">{{ workspace.title }}</h3>
    </div>

    <!-- Actions -->
    <div class="ui basic segment">
      <!-- Static list of tabs -->
      <ul class="">
        <li v-if="!tabs.length" class="tab">This workspace contains no tabs</li>
        <li class="tab" v-for="tab in tabs" :key="tab.Id">{{ tab.title | shorten }}</li>
      </ul>

      <!-- WS controls -->
      <!-- <div class="actions right floated">
        <button class="ui basic button icon" :class="[cls.buttonOpen]" @click="openWindow">
          <i class="icon sticky note"></i></button>
        <button class="ui basic button icon" :class="[cls.buttonAdd]" @click="addCurrentTab">
          <i class="icon plus"></i></button>
        <button class="ui basic button icon" :class="[cls.buttonEdit]" @click="editWS">
          <i class="icon cog"></i></button>
      </div> -->
    </div>

    <!-- Workspace create/edit form -->
    <!-- <h3>Workspace name</h3> -->
    <!-- <div class="ui big input" style="width: 100%; margin-bottom: 35px;"> -->
      <!-- <input type="text" v-model="workspace.title" style="width:80%"> -->
      <!-- <button @click="submit" class="ui large button green" :class="{ orange: wsId }" style="margin-left: 10px; width: 90px;"> -->
        <!-- {{ wsId ? 'Save' : 'Create' }} -->
      <!-- </button> -->
    <!-- </div> -->

    <!-- Tab list -->
    <!-- <div v-if="wsId">
      <h3>{{ tabs.length ? 'This workspace contains the following tabs' : 'This workspace contains no tabs' }}</h3>
      <WSDetailsTabList :wsId="workspace.id" />
    </div> -->

    <!-- </div> -->

  </div>
</template>

<script>
// import Loading from '../components/items/Loading.vue';
// import WSDetailsTabList from '../components/WSDetailsTabList.vue';

export default {
  // components: { WSDetailsTabList },
  data () { return { workspace: null }; },
  created () {
    // Create new workspace with deconstructed data or default
    const defaultWS = { title: 'Workspace #' + Math.round(Math.random() * 99) };
    this.workspace = this.wsId ? { ...this.$store.getters.allWS.find(ws => ws.id === this.wsId) } : defaultWS;
  },
  computed: {
    wsId: function () {
      return this.$route.params.id || null;
    },
    tabs: function () {
      if (!this.workspace.id) return [];
      return [...this.$store.getters.allTabs.filter(t => t.wsId === this.workspace.id)];
    }
  },
  methods: {
    // ...mapActions(['createOrUpdateWS']),
    // async submit (e) {
    // await this.createOrUpdateWS(this.workspace);
    // this.$router.push('/');
    // },
    // cancel () {
    // this.$router.push('/');
    // }
  }
};
</script>

<style scoped>
.segment {
  border: 0px none !important;
}
.header {
  margin-top: 0px;
}
.label {
  margin-bottom: 5px;
  color: #999;
}
.btn-rename {
  border: 0px none !important;
  margin-top: 18px !important;
}
</style>
