<template>
  <v-layout row wrap align-center justify-center ref="wall" class="wallpaper">
    <v-flex xs10 sm8 md4>
      <v-card class="elevation-12">
        <v-card-text>
          <v-badge class="bdg-100w">
            <span slot="badge">
              <v-icon dark large>wifi</v-icon>
            </span>
            <h1 class="display-1 title-center">{{ page.title }}</h1>
          </v-badge>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="name"
              label="Name"
              type="text"
              v-model="email"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="email"
              name="email"
              label="eMail"
              type="text"
              v-model="email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-checkbox
              label="I agree to sell my soul for WiFi"
              v-model="disclaimer"
              :rules="[rules.required]"
            ></v-checkbox>
            <v-btn flat small @click.stop="dlgDisclaimer = true">(more about this)</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary">Connect to Free WiFi</v-btn>
        </v-card-actions>
      </v-card>
      <v-footer class="welcome-footer">
        <v-layout row wrap justify-center>
          <v-flex xs12 py-2 text-xs-center white--text class="footer-flex">
            <v-card height="57px" flat>
              <div class="headline text-xs-center pa-2"></div>
              <v-bottom-nav absolute :value="true" color="transparent">
                <v-badge left color="purple" overlap v-if="newsList.length > 0">
                  <span slot="badge" dark small>{{ newsList.length }}</span>
                  <v-btn flat color="teal" value="specials" @click.stop="dlgNews = true">
                    <span>News</span>
                    <v-icon>new_releases</v-icon>
                  </v-btn>
                </v-badge>
                <v-btn flat color="teal" value="menu" :href="page.menu">
                  <span>Menu</span>
                  <v-icon>restaurant_menu</v-icon>
                </v-btn>
                <v-btn flat color="teal" value="specials" @click.stop="dlgSpecials = true" v-if="page.specials.trim().length > 0">
                  <span>Today's Specials</span>
                  <v-icon>stars</v-icon>
                </v-btn>
              </v-bottom-nav>
            </v-card>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-flex>
    <v-dialog v-model="dlgDisclaimer" max-width="600px">
      <v-card>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs6 text-xs-left>
              <h3>Disclaimer</h3>
            </v-flex>
            <v-flex xs6 text-xs-right>
              <v-icon large>gavel</v-icon>
            </v-flex>
          </v-layout>
          <div class="divider"></div>
          <v-layout row wrap>
            <v-flex xs12>
              <div v-html="$md.render(page.disclaimer)"></div>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat block @click.stop="dlgDisclaimer = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dlgNews" fullscreen transition="dialog-bottom-transition" :overlay="false" v-if="newsList.length > 0">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dlgNews = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>News</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-icon dark large>new_releases</v-icon>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="item in news" :key="item.title">
              <v-card class="card-news">
                <v-card-media
                  :class="(item.negative ? 'white--text' : '')"
                  height="200px"
                  :src="item.thumbnail"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">{{ item.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-title>
                  <div>
                    <span class="grey--text">{{ item.subtitle }}</span><br>
                    <div v-html="typeof item.body === 'string' ? $md.render(item.body) : ''"></div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dlgSpecials" max-width="600px" v-if="page.specials.trim().length > 0">
      <v-card>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs6 text-xs-left>
              <h3>Today's Specials</h3>
            </v-flex>
            <v-flex xs6 text-xs-right>
              <v-icon large>stars</v-icon>
            </v-flex>
          </v-layout>
          <div class="divider"></div>
          <v-layout row wrap>
            <v-flex xs12>
              <div v-html="$md.render(page.specials)"></div>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat block @click.stop="dlgSpecials = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      dlgDisclaimer: false,
      dlgNews: false,
      dlgSpecials: false,
      name: '',
      email: '',
      disclaimer: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      page: {
        title: "title",
        wallpaper: "/img/null.png",
        disclaimer: "legal stuff",
        specials: "",
        menu: "",
        body: "body"
      },
      newsList: [],
      news: []
    }
  },
  async asyncData ({ params }) {
    let p = await axios.get('/page/welcome.json')

    let n = [];
    try {
      n = await axios.get('/news/list.json')
    } catch(e) {
      // catch error
    }

    return {
      page: typeof p.data === 'object' ? p.data : {},
      newsList: typeof n.data === 'object' ? n.data : []
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      const self = this;
      let filename = ''

      this.$refs.wall.style='background-image: url("' + this.page.wallpaper + '")'

      async function loadNews() {
        for(filename of self.newsList) {
          let { data } = await axios.get('/news/' + filename)
          self.news.push(data)
        }
      }
      loadNews()
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
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title-center {
  width: 100%;
  text-align: center;
  padding: 30px 0;
  font-weight: 200;
}

.bdg-100w {
  width: 100%;
}

.bdg-100w .badge__badge {
  top: -50px;
  right: unset;
  left: 97%;
  width: 65px;
  height: 65px;
}
.welcome-footer {
  padding: 0px;
  border-top: 1px solid lightgrey;
}

.footer-flex {
  padding: 0px !important;
}

.divider {
  background: transparent !important;
  width: 100%;
  min-width: 100%;
  height: 1px;
  margin-top: 10px;
  border-top: 1px solid lightgrey;
  padding-top: 10px;
}

.card-news {
  margin: 25px;
}
</style>
