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
            Edit produk
          </q-toolbar-title>
        </q-toolbar>
        <form enctype="multipart/form-data">
          <div class="row justify-center">
            <p style=" width:90%; margin-top:10px;">Nama barang :</p>
            <q-input
              name="namaproduk"
              dense
              outlined
              v-model="dataproduk.namaproduk"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
              label="Nama produk"
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
            />
            <p style=" width:90%; ">Harga barang :</p>
            <q-input
              name="harga"
              dense
              outlined
              v-model="dataproduk.harga"
              type="number"
              label="Harga produk"
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <p style=" width:90%;">Deskripsi :</p>
            <q-editor
              v-if="dataproduk.deskripsi"
              name="deskripsi"
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              v-model="dataproduk.deskripsi"
              :definitions="{
                bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
              }"
            />
            <p style=" width:90%;">Gambar sekarang :</p>
            <img
              v-if="dataproduk.gambar"
              :src="
                'https://kedbel.com/dev.kedbel.com/storage/' + dataproduk.gambar
              "
              style="width:150px; height:150px;"
            />
            <p style=" width:90%;">Ubah Gambar :</p>
            <q-file
              name="gambar"
              @change="onfilechange"
              dense
              outlined
              v-model="image"
              label="Gambar produk"
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; "
            />
            <q-btn
              @click.prevent="ubah"
              type="submit"
              dense
              color="primary"
              label="Edit"
              style="width:90%; margin: 20px; justify-content: center;"
            />
          </div>
        </form>
      </q-page>
    </transition>
  </q-page-container>
</template>

<script>
import axios from "axios";
import router from "src/router";
export default {
  props: ["id"],
  data() {
    return {
      dialogUpdate: false,
      confirm: false,
      position: "top",
      dataproduk: {
        namaproduk: "",
        harga: null,
        deskripsi: "",
        gambar: ""
      },
      image: null
    };
  },
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk/ " + this.id)
      .then(response => {
        this.dataproduk = response.data;
      });
  },
  methods: {
    onfilechange(event) {
      let file = event.target.files[0];
      this.image = file;
      console.log(this.image);
    },

    ubah() {
      let dataproduk = new FormData();
      dataproduk.append("namaproduk", this.dataproduk.namaproduk);
      dataproduk.append("harga", this.dataproduk.harga);
      dataproduk.append("deskripsi", this.dataproduk.deskripsi);
      dataproduk.append("gambar", this.image);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      const produk = {
        namaproduk: this.dataproduk.namaproduk,
        harga: this.dataproduk.harga,
        deskripsi: this.dataproduk.deskripsi,
        gambar: this.dataproduk.gambar
      };
      axios
        .put(
          "https://kedbel.com/dev.kedbel.com/api/produk/update/" + this.id,
          this.dataproduk
        )
        .then(this.$router.push("/indexadmin"))
        .catch(err => {
          if (err.response.status === 422) {
            this.errors = [];
            _.each(err.response.data.errors, error => {
              _.each(error, e => {
                this.errors.push(e);
              });
            });
          }
        });
    }
  }
};
</script>
