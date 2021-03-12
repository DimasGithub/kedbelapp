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
              rounded
              outlined
              v-model="username"
              label="Nama pengguna"
              style="width:90%; margin:10px;"
            />
            <q-input
              rounded
              outlined
              v-model="password"
              type="password"
              label="Kata sandi"
              style="width:90%;"
            />
            <q-btn
              @click="$router.push('/indexadmin')"
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
      username: "",
      password: ""
    };
  }
};
</script>
