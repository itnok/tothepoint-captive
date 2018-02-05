<template>
  <v-layout row wrap ref="wall" class="wallpaper">
    <v-flex dflex xs12>
      <app-logo/>
      <h1 class="title">
        {{ page.title }}
      </h1>
      <div v-html="$md.render(page.body)"></div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import AppLogo from '~/components/AppLogo.vue'

export default {
  data () {
    return {
      page: {
        title: "title",
        wallpaper: "",
        body: "body"
      }
    }
  },
  async asyncData ({ params }) {
    let { data } = await axios.get('/page/welcome.json')
    return { page: data }
  },
  watch: {
    page: function (val) {
      this.$refs.wall.style='background-image: url("' + val.wallpaper + '")'
    }
  },
  components: {
    AppLogo
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$refs.wall.style='background-image: url("' + this.page.wallpaper + '")'
    })
  }
}
</script>

<style>
.wallpaper {
  padding: 1px 0;
  height: 100vh;
  width: 100%;
  background-image: url("/img/null.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
