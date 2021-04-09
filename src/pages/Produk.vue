<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
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
            Produk
          </q-toolbar-title>
          <q-btn-dropdown color="primary" flat round dense>
            <q-list>
              <q-item clickable v-close-popup @click="$router.push('/panduan')">
                <q-item-section>
                  <q-item-label>Panduan</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="$router.push('/login')">
                <q-item-section>
                  <q-item-label>Login</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
        <div class="row" style="margin-top:10px; margin-button:10px;">
          <div class="col-6" v-for="info in info.data" v-bind:key="info.id">
            <div style="margin:5px;">
              <q-card
                style="height:250px;"
                class="my-card"
                @click="$router.push('/produk/' + info.id)"
              >
                <img
                  :src="'http://127.0.0.1:8000/storage/' + info.gambar"
                  style="height:160px;"
                />
                <q-card-section>
                  <div class="text-h7">{{ info.namaproduk }}</div>
                  <div class="text-h7 text-weight-bolder text-primary">
                    Rp.{{ formatPrice(info.harga) }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
          <div v-if="infoadmin.key === 'site.nomorwa'">
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn
                fab
                icon="phone"
                color="primary"
                @click="
                  redirect(
                    'https://wa.me/62' +
                      infoadmin.value +
                      '?text=Hi%2C%20Saya%20ingin%20konsultasi'
                  )
                "
              />
            </q-page-sticky>
          </div>
        </div>
      </q-page>
    </transition>
  </q-page-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      infoadmin: {},
      info: {},
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  },
  methods: {
    redirect(url) {
      window.location = url;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/produk")
      .then(response => (this.info = response));
    axios
      .get("http://127.0.0.1:8000/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
