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
          <img :src="'http://127.0.0.1:8000/storage/' + dataproduk.gambar" />

          <q-card-section>
            <div class="text-h6 text-weight-bolder text-primary">
              Rp. {{ formatPrice(dataproduk.harga) }}
            </div>
            <div class="text-h6">{{ dataproduk.namaproduk }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-html="dataproduk.deskripsi" />

          <div class="row justify-center">
            <q-btn
              @click="open('bottom')"
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
    <q-dialog v-model="dialogUpdate" :position="position" width="100%">
      <q-card style="width:100%; height:90%; ">
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
              @click.prevent="ubah"
              type="submit"
              dense
              color="primary"
              label="Edit"
              style="width:90%; margin: 20px; justify-content: center;"
            />
          </div>
        </form>
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
      dialogUpdate: false,
      confirm: false,
      position: "top",
      dataproduk: {
        namaproduk: null,
        harga: null,
        deskripsi: null
      },
      gambar: null
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    open(position) {
      this.position = position;
      this.dialogUpdate = true;
    },
    redirect(url) {
      window.location = url;
    },
    hapus(id) {
      axios.delete("http://127.0.0.1:8000/api/produk/delete/" + this.id).then(
        this.$router.push(response => {
          this.$router.push("/indexadmin");
        })
      );
      console.log("Deleted article successfully");
    },
    handleFileObject() {
      this.gambar = this.$refs.file.files[0];
      this.gambarName = this.gambar.name;
    },
    ubah(id) {
      let dataproduk = new FormData();
      dataproduk.append("gambar", this.gambar);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      axios
        .put("http://127.0.0.1:8000/api/produk/update/" + this.id, dataproduk, {
          headers: {
            "Content-Type":
              "multipart/form-data; charset=utf-8; boundary=" +
              Math.random()
                .toString()
                .substr(2)
          }
        })
        .then(
          this.$router.push(response => {
            // push router ke read data
            this.$router.push("/indexadmin/");
          })
        )
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
      console.log(response);
    });
    axios
      .get("http://127.0.0.1:8000/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
