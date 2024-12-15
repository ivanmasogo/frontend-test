<template>
  <button @click="logoutAndRedirect" class="btn btn-danger">Logout</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogoutButton',
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('favorites', ['removeToken']),
    /**
     * Maneja el cierre de sesión del usuario.
     *
     * @returns {void}
     */
    logoutAndRedirect() {
      this.logout();
      this.removeToken();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
button {
  position: fixed;
  top: 3%;
  right: 5%;
  z-index: 1;
}
</style>
