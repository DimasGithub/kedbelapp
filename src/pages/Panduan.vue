<template>
  <q-page-container>
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      appear
      :duration="700"
    >
      <q-page>
        <q-toolbar eleveted class="text-primary">
          <q-toolbar-title>
            <q-btn
              flat
              round
              dense
              icon="arrow_back"
              @click="$router.push('/')"
            ></q-btn>
            Panduan
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section>
          <q-card
            class="my-card full-height"
            style=" height: 100%; "
            shadow-box
          >
            <q-list bordered class="rounded-borders" style="width:100%;">
              <!-- <div v-for="infotentang in infotentang.data" :key="infotentang">
                <div v-if="infotentang.id >= 41"> -->
              <q-expansion-item
                style="font-weight:bold;"
                expand-separator
                label="Cara pemesanan produk baju"
              >
                <q-card>
                  <q-card-section style="font-weight:normal;">
                    1. Klik menu produk sablon<br />
                    2. Pilih baju yang akan dipesan<br />
                    3. klik pesan <br />
                    4. Masukan data pemesanan<br />
                    5. Dialihkan ke Whatsapp, kemudian kirim pesan whatsapp anda
                    <br />
                    6. Admin segera menjawab pemesanan anda<br />
                    7. Admin melakukan konfirmasi<br />
                    8. Pembayaran<br />
                    9. Paket dikirim
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                style="font-weight:bold;"
                expand-separator
                label="Cara pemesanan kustom sablon"
              >
                <q-card>
                  <q-card-section style="font-weight:normal;">
                    1. Klik menu kustom sablon<br />
                    2. Masukan data pemesanan<br />
                    3. Admin akan menjawab pesanan anda<br />
                    4. Negosasi <br />
                    5. Pemabayaran DP<br />
                    6. Proses produksi <br />7. Pelunasan pembayaran <br />
                    8. Paket dikirim<br />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <!-- </div>
              </div> -->
            </q-list>
          </q-card>
        </q-card-section>
      </q-page>
    </transition>
  </q-page-container>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
