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
          <form
            method="post"
            @submit="addProduct"
            class="q-gutter-md"
            enctype="multipart/form-data"
          >
            <div class="row justify-center">
              <p style=" width:90%; margin-top:10px;">Nama :</p>
              <q-input
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
              <!-- <q-editor
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              v-model="dataproduk.content"
              :definitions="{
               bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}}"
            /> -->
              <!-- <p style=" width:90%;">Deskripsi :</p>
             <q-editor
              
              style="width:90%; margin-right:10px; margin-left:10px; margin-bottom: 20px; justify-content: center;"
              v-model="dataproduk.deskripsi"
              :definitions="{
               bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}}"
            />
       -->
              <p style=" width:90%;">Upload Gambar :</p>
              <input
                type="file"
                class="form-control"
                v-on:change="onImageChange"
              />
              <q-btn
                type="submit"
                dense
                color="primary"
                label="Add"
                style="width:90%; margin: 20px; justify-content: center;"
              />
              <!-- <q-btn
              type="reset"  
              dense
              outlined
              color="primary"
              label="Reset"
              style="width:90%; margin: 20px; justify-content: center;"
            /> -->
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
    onImageChange(e) {
      console.log(e.target.files[0]);
      dataproduk.picture = e.target.files[0];
    },
    addProduct() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post("http://127.0.0.1:8000/api/biodata/add", this.dataproduk, config)
        .then(response => this.$router.push("/indexadmin"))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
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
