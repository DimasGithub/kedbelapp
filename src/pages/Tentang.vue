<template>
  <q-page-container>
    <q-page>
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
              Tentang kami
            </q-toolbar-title>
          </q-toolbar>
          <!-- <q-carousel
            animated
            v-model="slide"
            arrows
            infinite
            style="height:250px; width:100%;"
          >
            <q-carousel-slide
              v-for="imgslider in imgslider.data"
              v-bind:key="imgslider.id"
              :name="imgslider.id"
            >
              <img
                v-bind:src="
                  'http://phpstack-537239-1742382.cloudwaysapps.com/storage/' +
                    imgslider.image
                "
                style=" background-size: cover; width:100%; height:100%; border-radius:20px;"
              />
            </q-carousel-slide>
          </q-carousel> -->
          <q-card class="my-card" style="margin:10px;">
            <img src="~assets/logo.png" />

            <q-card-section class="vertical-top q-pt-none"
              >KEDBEL merupakan Rumah sablon yang menyediakan jasa sablon
              berpengalaman dan profesional yang siap melayani permintaan sablon
              kaos. Kami telah dipercaya oleh berbagai komunitas, perusahaan,
              event, instansi, maupun individu. Berlokasikan di Pemalang, Jawa
              Tengah namun bukan berarti itu menghalangi kami dalam mengirimkan
              pesanan ke seluruh Indonesia.</q-card-section
            >

            <div v-for="infoadmin in infoadmin.data" v-bind:key="infoadmin.id">
              <div v-if="infoadmin.key === 'site.nomorwa'">
                <div class="row justify-center">
                  <q-btn
                    @click="
                      redirect(
                        'https://wa.me/62' +
                          infoadmin.value +
                          '?text=Hi%2C%20Saya%20ingin%20konsultasi'
                      )
                    "
                    unelevated
                    rounded
                    color="primary"
                    label="Hubungi kami"
                    style="width:90%; margin-bottom : 20px;"
                  />
                </div>
              </div>
            </div>
          </q-card>
        </q-page>
      </transition>
    </q-page>
  </q-page-container>
</template>

<script>
import axios from "app/node_modules/axios";
export default {
  data() {
    return {
      slide: 1,
      infoadmin: {}
    };
  },
  methods: {
    redirect(url) {
      window.location = url;
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/setting")
      .then(response => (this.infoadmin = response));
  }
};
</script>
