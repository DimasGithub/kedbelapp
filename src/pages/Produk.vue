<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
      appear
      :duration="700"
    >
      <q-page>
        <q-header reveal class="fixed-top" style="background-color:white; ">
          <q-toolbar
            class="text-primary"
            style="background-color:white; position: fixed; top: 0px; width: 100%;"
          >
            <q-btn
              flat
              round
              dense
              icon="arrow_back"
              @click="$router.push('/')"
            />
            <q-toolbar-title>
              Produk
            </q-toolbar-title>
            <q-btn-dropdown color="primary" flat round dense>
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="$router.push('/panduan')"
                >
                  <q-item-section>
                    <q-item-label>Panduan</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="$router.push('/login')">
                  <q-item-section>
                    <q-item-label>Login</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-toolbar>
          <q-input
            outlined
            dense
            border
            rounded
            style="background-color:white; position: fixed; top: 35px; width: 100%; padding: 15px;"
            v-model="filter"
            placeholder="Cari produk"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-header>

        <div class="q-pa-md" style="margin-top:60px;">
          <q-table
            grid
            :data="dataproduk"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-6 col-sm-6 col-md-5">
                <q-card @click="lihatdetail(props.row.id)">
                  <q-card-section class="text-center">
                    <img
                      :src="
                        'https://kedbel.com/dev.kedbel.com/storage/' +
                          props.row.gambar
                      "
                      style="width:100%;"
                    />
                  </q-card-section>
                  <q-separator />
                  <div class="text-center">
                    <div style="font-size:16px;">
                      {{ props.row.namaproduk }}
                    </div>
                    <div
                      class="text-weight-bolder text-primary"
                      style="font-size:19px;"
                    >
                      Rp.{{ formatPrice(props.row.harga) }}
                    </div>
                  </div>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
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
      filter: "",
      infoadmin: {},
      columns: [
        {
          name: "namaproduk",
          label: "Nama produk",
          field: "namaproduk",
          align: "left",
          sortable: true
        },
        {
          name: "Harga",
          align: "left",
          label: "Harga",
          field: "harga",
          sortable: true
        },
        { name: "actions", label: "Aksi", field: "id", align: "center" }
      ],
      dataproduk: []
    };
  },
  methods: {
    lihatdetail(id) {
      this.$router.push("/produk/" + id);
    },
    redirect(url) {
      window.location = url;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk")
      .then(response => (this.dataproduk = response.data));
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
