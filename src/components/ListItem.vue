<template>
  <li id="ws-list-item">
    {{ blop }}
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['blop'])
  }
}
</script>

<style scoped>

</style>
