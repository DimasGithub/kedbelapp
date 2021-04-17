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
            @click="$router.push('/indexadmin')"
          />
          <q-toolbar-title>
            Detail produk
          </q-toolbar-title>
        </q-toolbar>

        <q-card class="my-card" style="margin:10px;">
          <img
            v-if="dataproduk.gambar"
            :src="
              'https://kedbel.com/dev.kedbel.com/storage/' + dataproduk.gambar
            "
          />

          <q-card-section>
            <div class="text-h6 text-weight-bolder text-primary">
              Rp. {{ formatPrice(dataproduk.harga) }}
            </div>
            <div class="text-h6">{{ dataproduk.namaproduk }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-html="dataproduk.deskripsi" />

          <div class="row justify-center">
            <q-btn
              @click="edit()"
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
    edit() {
      this.$router.push("/indexadmin/edit/" + this.dataproduk.id);
    },
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
    hapus() {
      axios
        .delete(
          "https://kedbel.com/dev.kedbel.com/api/produk/delete/" + this.id
        )
        .then(response => {
          this.$router.push("/indexadmin");
          this.$q.notify({
            type: "positive",
            message: `Data berhasil dihapus.`
          });
        });
      console.log("Deleted article successfully");
    },
    handleFileObject() {
      this.gambar = this.$refs.file.files[0];
      this.gambarName = this.gambar.name;
      console.log(this.gambarName);
    },

    ubah() {
      let dataproduk = new FormData();
      dataproduk.append("gambar", this.gambar);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      axios
        .put(
          "https://kedbel.com/dev.kedbel.com/api/produk/update/" + this.id,
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
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk/ " + this.id)
      .then(response => {
        this.dataproduk = response.data;
        console.log(response);
      });
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
