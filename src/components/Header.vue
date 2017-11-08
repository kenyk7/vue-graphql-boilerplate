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
      <nav-app></nav-app>
    </section>
  </div>
</template>

<script>
import NavApp from './header/Nav.vue'

export default {
  components: {
    NavApp
  }
}
</script>
