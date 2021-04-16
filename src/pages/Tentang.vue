<template>
  <q-page-container>
    <q-page>
      <transition
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
        appear
        :duration="700"
      >
        <q-page>
          <q-toolbar elevated class="text-primary">
            <q-btn
              flat
              round
              dense
              icon="arrow_back"
              @click="$router.push('/')"
            />
            <q-toolbar-title>
              Tentang kami
            </q-toolbar-title>
          </q-toolbar>
          <q-card class="my-card" style="margin:10px;">
            <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
              <img
                v-if="infoadmin.key === 'site.logo'"
                :src="
                  'https://kedbel.com/dev.kedbel.com/storage/' + infoadmin.value
                "
                style="width:300px; display: block; margin-left: auto; margin-right: auto;"
              />
              <q-card-section
                class="vertical-top "
                v-if="infoadmin.key === 'site.about'"
                style="text-align: justify;"
                >{{ infoadmin.value }}</q-card-section
              >
              <div class="row justify-center">
                <q-btn
                  v-if="infoadmin.key === 'site.nomorwa'"
                  @click="
                    redirect(
                      'https://wa.me/62' +
                        infoadmin.value +
                        '?text=Hi%2C%20Saya%20ingin%20konsultasi'
                    )
                  "
                  unelevated
                  rounded
                  color="primary"
                  label="Hubungi kami"
                  style="width:90%; margin-bottom : 20px;"
                />
              </div>
            </div>
          </q-card>
        </q-page>
      </transition>
    </q-page>
  </q-page-container>
</template>

<script>
import axios from "app/node_modules/axios";
export default {
  data() {
    return {
      slide: 1,
      infoadmin: {}
    };
  },
  methods: {
    redirect(url) {
      window.location = url;
    }
  },
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
