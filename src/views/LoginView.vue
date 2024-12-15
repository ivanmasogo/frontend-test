<template>
  <div class="login">
    <div class="row">
      <div
        class="login__container login__content col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center"
      >
        <p class="mt-5 mx-auto">
          Developed by
          <a
            class="login__link"
            href="https://github.com/ivanmasogo"
            target="_blank"
            rel="noopener noreferrer"
            >Ivan Martin Masogo</a
          >
        </p>
      </div>
      <div
        class="login__container login__form col-lg-6 d-flex flex-column align-items-center justify-content-center"
      >
        <login-form />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
}

.login__container {
  height: 70vh;
}

.login__content {
  background-color: black;
  color: white;
  font-size: 25px;
}

.login__link {
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}

.login__form {
  background-color: white;
}
</style>
