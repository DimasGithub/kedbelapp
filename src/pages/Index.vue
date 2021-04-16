<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      appear
      :duration="700"
    >
      <q-page class="flex flex-center">
        <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
          <div v-if="infoadmin.key === 'site.logo'">
            <q-img
              style="width:280px; bottom: 220px; margin-left: auto; margin-right: auto;"
              :src="
                'https://kedbel.com/dev.kedbel.com/storage/' + infoadmin.value
              "
            />
          </div>
        </div>
        <q-btn
          @click="$router.push('/produk')"
          unelevated
          rounded
          color="primary"
          label="Produk sablon"
          style="width:90%; position: absolute; bottom: 150px;"
        />
        <q-btn
          @click="open('bottom')"
          outline
          rounded
          color="primary"
          label="Kustom sablon"
          style="width:90%; position: absolute; bottom: 100px;"
        />
        <q-btn
          @click="$router.push('/tentang')"
          style="width:90%; position: absolute; bottom: 50px;"
          flat
          size="10px"
          color="primary"
          label="Tentang kami"
        />
      </q-page>
    </transition>
    <q-dialog v-model="dialog" :position="position" width="100%">
      <q-card style="width:100%; height:90%; ">
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
              v-model="jenisbaju"
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
              v-model="keterangan"
              type="textarea"
              label="Ketarangan"
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
                        '?text=PEMESANAN%20SABLON%20KUSTOM%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%20%0D%0ANAMA%20PEMESAN%20%20%3A%20%20' +
                        nameorder +
                        '%20%0D%0AJUMLAH%20PESANAN%20%20%3A%20%20' +
                        qtyorder +
                        '%20%0D%0AJENIS%20BAJU%20%20%3A%20%20' +
                        jenisbaju +
                        '%20%0D%0AWARNA%20PESANAN%20%20%3A%20%20' +
                        colororder +
                        '%20%0D%0AKETERANGAN%20%20%3A%20%20' +
                        keterangan +
                        '%0D%0AALAMAT%20%20%3A%20%20' +
                        addressorder +
                        '%20%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%20'
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
import axios from "app/node_modules/axios";
export default {
  data() {
    return {
      nameorder: null,
      addressorder: null,
      qtyorder: null,
      colororder: null,
      jenisbaju: null,
      keterangan: null,
      infoadmin: {},
      optionscolor: ["HITAM", "PUTIH", "BIRU", "MAROON", "KUNING"],
      options: ["LENGAN PENDEK", "LENGAN PANJANG"],
      dialog: false,
      position: "top",
      info: {}
    };
  },
  methods: {
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
      .get("https://kedbel.com/dev.kedbel.com/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
