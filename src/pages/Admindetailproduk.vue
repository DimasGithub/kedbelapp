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
          <img :src="'http://127.0.0.1:8000/storage/' + info.gambar" />

          <q-card-section>
            <div class="text-h6 text-weight-bolder text-primary">
              Rp. {{ formatPrice(info.harga) }}
            </div>
            <div class="text-h6">{{ info.namaproduk }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-html="info.deskripsi" />

          <div class="row justify-center">
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Edit"
              style="width:90%; margin-bottom : 10px;"
            />
            <q-btn
              @click="confirm = true"
              unelevated
              rounded
              label="Hapus"
              style="width:90%; margin-bottom : 20px; background-color:red; color:white; "
            />
          </div>
        </q-card>
      </q-page>
    </transition>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Apakah anda yakin akan dihapus?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batal" color="primary" v-close-popup />
          <q-btn
            flat
            label="Hapus"
            color="primary"
            v-close-popup
            @click="hapus"
          />
        </q-card-actions>
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
      confirm: false,

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
    },
    hapus(id) {
      axios
        .delete("http://127.0.0.1:8000/api/produk/delete/" + this.id)
        .then(this.$router.push("/indexadmin"));
      console.log("Deleted article successfully");
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:8000/api/produk/ " + this.id).then(response => {
      this.info = response.data;
      console.log(response);
    });
    axios
      .get("http://127.0.0.1:8000/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
