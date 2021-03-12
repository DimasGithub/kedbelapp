<template>
  <q-page-container>
    <q-page>
      <q-toolbar elevated class="text-primary">
        <q-btn flat round dense icon="arrow_back" @click="$router.push('/')" />
        <q-toolbar-title>
          Admin panel
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" @click="$router.push('/')" />
      </q-toolbar>

      <div class="q-pa-md">
        <q-btn
          dense
          color="primary"
          label="Tambah produk"
          style="margin: 10px;"
          size="12px"
        />
        <q-table
          title="Data produk"
          :data="dataproduk"
          :columns="columns"
          row-key="dataproduk.id"
        />
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
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
        {
          name: "Aksi",
          align: "left",
          label: "Aksi",
          field: "<a href='kedbel.com'>link text</a>",
          sortable: true
        }
      ],
      dataproduk: []
    };
  },
  mounted() {
    axios
      .get("https://kedbel.com/dev.kedbel.com/api/produk")
      .then(response => (this.dataproduk = response.data));
  }
};
</script>
