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
            @click="$router.push('/indexadmin')"
          />
          <q-toolbar-title>
            Tambah produk
          </q-toolbar-title>
        </q-toolbar>
        <div class="row" style="width:100%;">
          <form>
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
                name="deskripsi"
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
                v-model="dataproduk.deskripsi"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
                :definitions="{
                  bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
                }"
              />
              <p style=" width:90%;">Upload Gambar :</p>
              <q-file
                name="gambar"
                @change="handleFileObject()"
                dense
                outlined
                v-model="gambar"
                label="Gambar produk"
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; "
              />
              <q-btn
                @click.prevent="addProduct"
                type="submit"
                dense
                color="primary"
                label="Add"
                style="width:90%; margin: 20px; justify-content: center;"
              />
              <q-btn
                @click="onReset"
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
import _ from "lodash";
export default {
  data() {
    return {
      dataproduk: {
        namaproduk: "",
        harga: 0,
        deskripsi: ""
      },
      gambar: null
    };
  },
  methods: {
    addProduct() {
      let dataproduk = new FormData();
      dataproduk.append("gambar", this.gambar);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      axios
        .post(
          "https://kedbel.com/dev.kedbel.com/api/produk/create",
          dataproduk,
          {
            headers: {
              "Content-Type":
                "multipart/form-data; charset=utf-8; boundary=" +
                Math.random()
                  .toString()
                  .substr(2)
            }
          }
        )
        .then(response => {
          this.$router.push("/indexadmin");
          this.$q.notify({
            type: "positive",
            message: `Data berhasil ditambah.`
          });
        })
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
    },
    onReset() {
      {
        (this.dataproduk.namaproduk = ""),
          (this.dataproduk.harga = ""),
          (this.dataproduk.content = ""),
          (this.dataproduk.deskripsi = ""),
          (this.gambar = "");
      }
    },
    handleFileObject() {
      this.gambar = this.$refs.file.files[0];
      this.gambarName = this.gambar.name;
      console.log(this.gambarName);
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
