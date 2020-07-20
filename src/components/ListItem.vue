<template>
  <div class="item">
    <div class="content">
      <h4>{{ name }}</h4>
      <ul>
        <li v-for="url in urls" :key="url">
          <p>{{ url }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: ['ws'],
  computed: {
    name () {
      return Object.keys(this.ws)[0]
    },
    urls () {
      return this.ws[this.name]
    }
  }
}
</script>

<style scoped>
.item {
  width: auto;
  padding: 15px;
  border-bottom: 1px solid lightgray;
}
.content {
  width:auto;
}

</style>
