<template>
  <div>
    <section class="hero is-primary has-shadow">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title is-2">
            <slot name="title">Simple blog realtime</slot>
          </h1>
          <h2 class="subtitle">
            <slot name="subtitle">A simple blog in relatime demo con vue and graph.cool</slot>
          </h2>
        </div>
      </div>
      <app-nav></app-nav>
    </section>
  </div>
</template>

<script>
import appNav from './nav.vue'

export default {
  components: {
    appNav
  }
}
</script>

<style scoped>
.title{
  font-weight: 300;
}
.subtitle{
  font-weight: 300;
}
</style>
