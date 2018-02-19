<template>
  <div id="app"
       class="app-wrapper">

    <app-header></app-header>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <app-footer></app-footer>

  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',

  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>
