<template>
  <q-page-container>
    <q-page>
      <q-toolbar elevated class="text-primary">
        <q-btn flat round dense icon="arrow_back" @click="$router.push('/')" />
        <q-toolbar-title>
          Admin panel
        </q-toolbar-title>
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

        <q-table
          title="Data produk"
          :data="dataproduk"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-action="id">
            <q-td :props="id">
              <q-btn
                color="primary"
                icon-right="edit"
                no-caps
                flat
                dense
                @click="$router.push('/indexadmin/produk/' + dataproduk)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
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
        { name: "action", label: "Aksi", field: "dataproduk.id" }
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
    pindah(index) {
      console.log(index);
      $router.push("/indexadmin/produk/" + id);
      console.log(this.$router);
    }
  }
};
</script>
