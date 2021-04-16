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
            contoh produk
          </q-toolbar-title>
        </q-toolbar>
        <div class="row" style="width:100%;">
          <q-form
            method="post"
            enctype="multipart/form-data"
            class="q-gutter-md"
            action="https://kedbel.com/dev.kedbel.com/api/biodata/add"
          >
            <div class="row justify-center">
              <p style=" width:90%; margin-top:10px;">Nama :</p>
              <q-input
                name="name"
                dense
                outlined
                v-model="dataproduk.name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
                label="Nama produk"
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              />
              <p style=" width:90%; ">Deskripsi :</p>
              <q-input
                dense
                name="description"
                outlined
                v-model="dataproduk.description"
                type="text"
                label="Deskripsi"
                style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
              <p style=" width:90%;">Konten :</p>
              <q-input
                dense
                name="content"
                outlined
                v-model="dataproduk.content"
                type="text"
                label="Konten"
                style=" width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center; height:200px;"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <p style=" width:90%;">Upload Gambar :</p>
              <input
                type="file"
                class="custom-file-input"
                id="customFile"
                ref="file"
                @change="handleFileObject()"
              />

              <q-btn
                type="submit"
                @click.prevent="submit"
                dense
                color="primary"
                label="Add"
                style="width:90%; margin: 20px; justify-content: center;"
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </transition>
  </q-page-container>
</template>
<script>
import axios from "axios";
import _ from "lodash";
import router from "src/router";
export default {
  data() {
    return {
      dataproduk: {
        name: null,
        description: null,
        content: null
      },
      picture: null
    };
  },
  methods: {
    submit() {
      let dataproduk = new FormData();
      dataproduk.append("picture", this.picture);
      _.each(this.dataproduk, (value, key) => {
        dataproduk.append(key, value);
      });
      axios
        .post("https://kedbel.com/dev.kedbel.com/api/biodata/add", dataproduk, {
          headers: {
            "Content-Type":
              "multipart/form-data; charset=utf-8; boundary=" +
              Math.random()
                .toString()
                .substr(2)
          }
        })
        .then($router.push("/indexadmin"))
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
    handleFileObject() {
      this.picture = this.$refs.file.files[0];
      this.pictureName = this.picture.name;
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
