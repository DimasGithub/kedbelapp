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
            Login
          </q-toolbar-title>
        </q-toolbar>
        <div class="cotent content-center">
          <div class="row justify-center">
            <q-input
              dense
              rounded
              outlined
              v-model="username"
              label="Nama pengguna"
              style="width:90%; margin:10px;"
            />
            <q-input
              dense
              rounded
              outlined
              v-model="password"
              type="password"
              label="Kata sandi"
              style="width:90%;"
            />
            <q-btn
              @click="Cek"
              unelevated
              rounded
              color="primary"
              label="Login"
              style="width:90%; margin: 20px;"
            />
          </div>
        </div>
      </q-page>
    </transition>
  </q-page-container>
</template>

<script>
export default {
  data() {
    return {
      datauser: {},
      username: "",
      password: ""
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/userku")
      .then(response => (this.datauser = response));
  },
  methods: {
    Cek() {
      if (
        this.username === this.datauser.email &&
        this.password === this.datauser.password
      ) {
        this.$q.notify({
          type: "negative",
          message: `Username dan password anda tidak cocok !!!`
        });
      } else {
        this.$router.push("/indexadmin");
      }
    }
  }
};
</script>
