<template>
  <main>
    <app-header></app-header>
    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </main>
</template>
<script>
import appHeader from './default/header.vue'
import appFooter from './default/footer.vue'
export default {
  components: {
    appHeader,
    appFooter
  }
}
</script>
