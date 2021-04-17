<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
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
            Produk
          </q-toolbar-title>
          <q-btn-dropdown color="primary" flat round dense>
            <q-list>
              <q-item clickable v-close-popup @click="$router.push('/panduan')">
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
        <div class="q-pa-md">
          <q-table
            grid
            :data="dataproduk"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <template v-slot:top>
              <q-input
                border
                rounded
                style="width:100%;"
                dense
                v-model="filter"
                placeholder="Cari produk"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-12 col-md-4">
                <q-card @click="lihatdetail(props.row.id)">
                  <q-card-section class="text-center">
                    <img
                      :src="
                        'https://kedbel.com/dev.kedbel.com/storage/' +
                          props.row.gambar
                      "
                      style="width:50%;"
                    />
                  </q-card-section>
                  <q-separator />
                  <div class="text-center">
                    <div style="font-size:18px;">
                      {{ props.row.namaproduk }}
                    </div>
                    <div class="text-h6 text-weight-bolder text-primary">
                      Rp.{{ formatPrice(props.row.harga) }}
                    </div>
                  </div>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
        <!-- <div class="row" style="margin-top:10px; margin-button:10px;">
          <div class="col-6" v-for="info in info.data" v-bind:key="info.id">
            <div style="margin:5px;">
              <q-card
                class="my-card"
                @click="$router.push('/produk/' + info.id)"
              >
                <img
                  :src="
                    'https://kedbel.com/dev.kedbel.com/storage/' + info.gambar
                  "
                />
                <q-card-section>
                  <div class="text-h7">{{ info.namaproduk }}</div>
                  <div class="text-h7 text-weight-bolder text-primary">
                    Rp.{{ formatPrice(info.harga) }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div> -->
        <!-- <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
          <div v-if="infoadmin.key === 'site.nomorwa'">
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn
                fab
                icon="phone"
                color="primary"
                @click="
                  redirect(
                    'https://wa.me/62' +
                      infoadmin.value +
                      '?text=Hi%2C%20Saya%20ingin%20konsultasi'
                  )
                "
              />
            </q-page-sticky>
          </div>
        </div> -->
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
