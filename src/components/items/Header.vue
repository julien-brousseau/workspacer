<template>
  <h1>
    <router-link v-for="(r, i) in routes" :key="i"
      :to="r.route"
      class="ui basic icon secondary button right floated">
        <i :class="r.icon" class="icon"></i>{{ r.title }}
    </router-link>
    {{ title }}
  </h1>
</template>

<script>
export default {
  props: ['title', 'routes']
};
</script>
