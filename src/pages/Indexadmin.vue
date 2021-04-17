<template>
  <q-page-container>
    <q-page>
      <q-toolbar elevated class="text-primary">
        <q-toolbar-title style="left:0;">
          Admin panel
        </q-toolbar-title>
        <q-btn-dropdown color="primary" flat round dense>
          <q-list>
            <q-item clickable v-close-popup @click="confirm">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
      <div>
        <q-btn
          dense
          @click="$router.push('/indexadmin/tambah')"
          color="primary"
          label="Tambah produk"
          style="margin: 10px;"
          size="12px"
        />
        <div class="q-pa-md">
          <q-table
            title="Data produk"
            dense
            :data="dataproduk"
            :columns="columns"
            row-key="name"
            :filter="filter"
          >
            <template v-slot:top-right>
              <q-input
                style="width: 100px;"
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Cari"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body-cell-actions="id">
              <q-td :props="id">
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  @click="detail(id.value)"
                  icon="edit"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import axios from "axios";
import router from "src/router";
export default {
  props: ["id"],
  data() {
    return {
      filter: "",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk")
      .then(response => (this.dataproduk = response.data));
  },
  methods: {
    detail(id) {
      this.$router.push("/indexadmin/produk/" + id);
    },
    pindah(index) {
      console.log(index);
      $router.push("/indexadmin/produk/" + id);
      console.log(this.$router);
    },
    confirm() {
      this.$q
        .dialog({
          title: "Logout",
          message: "apakah anda yakin ingin keluar?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$router.push("/produk");
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>
