<template>
  <h1>

    <router-link v-for="(r, i) in routes" :key="i"
      :to="r.route"
      class="ui button right floated" :class="[r.color || 'secondary', (r.title) ? '' : 'icon']">
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
