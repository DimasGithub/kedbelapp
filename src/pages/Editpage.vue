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
              :definitions="{
                bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
              }"
            />
            <p style=" width:90%;">Gambar sekarang :</p>
            <img
              :src="'http://127.0.0.1:8000/storage/' + dataproduk.gambar"
              style="width:150px; height:150px;"
            />
            <p style=" width:90%;">Ubah Gambar :</p>
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
export default {
  props: ["id"],
  data() {
    return {
      dialogUpdate: false,
      confirm: false,
      position: "top",
      dataproduk: {},
      gambar: null
    };
  },
  methods: {
    handleFileObject() {
      this.gambar = this.$refs.file.files[0];
      this.gambarName = this.gambar.name;
      console.log(this.dataproduk.gambar);
    },
    ubah(id) {
      let dataproduk = new FormData();
      dataproduk.append("gambar", this.gambar);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      axios
        .put(
          "http://127.0.0.1:8000/api/produk/update/" + this.id,
          this.dataproduk,
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
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:8000/api/produk/ " + this.id).then(response => {
      this.dataproduk = response.data;
      console.log(this.dataproduk);
    });
  }
};
</script>
