<template>
  <q-page-container>
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
            Tambah produk
          </q-toolbar-title>
        </q-toolbar>
        <div class="row" style="width:100%;">
          <form @submit.prevent="addProduct" class="q-gutter-md">
            <div class="row justify-center">
              <p style=" width:90%; margin-top:10px;">Nama barang :</p>
              <q-input
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
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
                v-model="dataproduk.deskripsi"
                :definitions="{
                  bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
                }"
              />
              <p style=" width:90%;">Upload Gambar :</p>
              <q-file
                dense
                outlined
                v-model="dataproduk.gambar"
                label="Gambar produk"
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              />
              <q-btn
                type="submit"
                dense
                color="primary"
                label="Add"
                style="width:90%; margin: 20px; justify-content: center;"
              />
              <q-btn
                type="reset"
                dense
                outlined
                color="primary"
                label="Reset"
                style="width:90%; margin: 20px; justify-content: center;"
              />
            </div>
          </form>
        </div>
      </q-page>
    </transition>
  </q-page-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dataproduk: {}
    };
  },
  methods: {
    addProduct() {
      this.axios
        .post("http://127.0.0.1:8000/api/produk/create", this.dataproduk)
        .catch(err => console.log(err))
        .then(response => this.$router.push("/indexadmin"))
        .catch()
        .finally(() => (this.loading = false));
    },
    onReset() {
      {
        (dataproduk.namaproduk = null),
          (dataproduk.harga = null),
          (dataproduk.content = null),
          (dataproduk.deskripsi = null),
          (dataproduk.gambar = null);
      }
    }
  }
};
</script>
<style>
p {
  text-align: left;
}
.row {
  justify-content: center;
}
</style>
