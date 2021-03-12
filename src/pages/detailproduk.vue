<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
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
            @click="$router.push('/produk')"
          />
          <q-toolbar-title>
            Detail produk
          </q-toolbar-title>
        </q-toolbar>

        <q-card class="my-card" style="margin:10px;">
          <img
            :src="'https://kedbel.com/dev.kedbel.com/storage/' + info.gambar"
          />

          <q-card-section>
            <div class="text-h6 text-weight-bolder text-primary">
              Rp. {{ formatPrice(info.harga) }}
            </div>
            <div class="text-h6">{{ info.namaproduk }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-html="info.deskripsi" />

          <div class="row justify-center">
            <q-btn
              @click="open('bottom')"
              unelevated
              rounded
              color="primary"
              label="Pesan"
              style="width:90%; margin-bottom : 20px;"
            />
          </div>
        </q-card>
      </q-page>
    </transition>

    <q-dialog v-model="dialog" :position="position" width="100%">
      <q-card style="width:100%; height:70%; ">
        <div>
          <div class="kartu">
            <div
              class="text-h6"
              style="margin-top:20px; margin:10px; font-weight: bold;"
            >
              Data pemesanan
            </div>
            <q-input
              dense
              rounded
              outlined
              v-model="nameorder"
              type="text"
              label="Nama lengkap"
              style="margin:10px;"
              required
            />
            <q-select
              dense
              rounded
              outlined
              v-model="sizeorder"
              :options="options"
              label="Ukuran baju"
              style="margin:10px;"
              required
            />
            <q-select
              dense
              rounded
              outlined
              v-model="colororder"
              :options="optionscolor"
              label="Warna baju"
              style="margin:10px;"
              required
            />
            <q-input
              type="text"
              dense
              rounded
              outlined
              v-model="qtyorder"
              label="Jumlah pemesanan"
              style="margin:10px;"
              required
            />
            <q-input
              dense
              rounded
              outlined
              v-model="addressorder"
              type="textarea"
              label="Alamat pemesan"
              style="margin:10px;"
              required
            />
            <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
              <div v-if="infoadmin.key === 'site.nomorwa'">
                <q-btn
                  flat
                  size="15px;"
                  class="bg-primary"
                  style="margin-buttom: 10px; border-radius : 20px; color:#ffff; margin:10px; width: 93%;"
                  @click="
                    redirect(
                      'https://wa.me/62' +
                        infoadmin.value +
                        '?text=PEMESANAN%20' +
                        info.namaproduk +
                        '%20%20%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0ANAMA%20PEMESAN%20%20%3A%20%20' +
                        nameorder +
                        '%20%0D%0AJUMLAH%20PEMESANAN%20%20%3A%20%20' +
                        qtyorder +
                        '%20%0D%0AUKURAN%20BAJU%20%20%3A%20%20' +
                        sizeorder +
                        '%20%0D%0AWARNA%20BAJU%20%20%3A%20%20' +
                        colororder +
                        '%20%0D%0AALAMAT%20%20%3A%20%20' +
                        addressorder +
                        '%20%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D'
                    )
                  "
                  >pesan</q-btn
                >
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      infoadmin: {},
      nameorder: null,
      addressorder: null,
      qtyorder: null,
      colororder: null,
      sizeorder: null,
      optionscolor: ["Hitam", "Putih", "Biru", "Maroon", "Kuning"],
      options: ["S", "M", "L", "XL", "XXL"],
      dialog: false,
      position: "top",
      info: {}
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    open(position) {
      this.position = position;
      this.dialog = true;
    },
    redirect(url) {
      window.location = url;
    }
  },
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk/ " + this.id)
      .then(response => {
        this.info = response.data;
        console.log(response);
      });
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/setting")
      .then(response => (this.infoadmin = response));
  }
  
};
</script>
