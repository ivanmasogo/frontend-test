<template>
  <form class="form-signin" @submit.prevent="handleSubmit">
    <img
      class="form-signin__icon mb-4"
      src="@/assets/images/icon-login.svg"
      alt="Login icon"
      width="100"
      height="100"
    />
    <h1 class="form-signin__title mb-3 font-weight-normal">LOGIN</h1>
    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          id="username"
          class="form-control mb-2 border-dark rounded-5"
          placeholder="Username"
          @input="onChange($event, 'username')"
          v-model="user.username"
          aria-describedby="username-error"
        />
        <label for="username"> Username </label>
      </div>
      <ul class="form-signin__errors" v-if="hasUserError" id="username-error">
        <li
          class="form-signin__error-text"
          v-for="(error, index) in errors.username"
          :key="index"
        >
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="form-floating">
      <input
        type="password"
        id="password"
        class="form-control mb-2 border-dark rounded-5"
        placeholder="Password"
        @input="onChange($event, 'password')"
        v-model="user.password"
        aria-describedby="password-error"
      />
      <label for="password"> Password </label>
    </div>
    <ul
      class="form-signin__errors mt-0"
      v-if="hasPasswordError"
      id="password-error"
    >
      <li
        class="form-signin__error-text"
        v-for="(error, index) in errors.password"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
    <button
      class="form-signin__button btn btn-dark rounded-5 d-flex align-items-center justify-content-center mt-3"
      :disabled="loading"
      type="submit"
    >
      <span v-if="!loading">Sign in</span>

      <!-- Loader -->
      <span
        v-else
        class="loader spinner-border spinner-border-sm"
        role="status"
        aria-hidden="false"
      >
      </span>
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import validationMixin from '@/mixins/validationMixin.js';

export default {
  name: 'LoginForm',
  mixins: [validationMixin], // Mixin para la lógica de validación
  data() {
    return {
      loading: false, // Controla el spinner
      errors: {
        // Almacena los errores de validación
        username: null,
        password: null,
      },
      user: {
        username: 'mor_2314', // Usuario por defecto
        password: '83r5^_', // Contraseña por defecto
      },
    };
  },
  computed: {
    hasUserError: function () {
      // True si hay errores en el usuario
      return this.errors.username && this.errors.username.length;
    },
    hasPasswordError: function () {
      // True si hay errores en el password
      return this.errors.password && this.errors.password.length;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    /**
     * Maneja el envío del formulario: valida el formulario, intenta iniciar sesión,
     * y proporciona retroalimentación mediante  toasts y redirección de página.
     *
     * @async
     * @returns {Promise<void>}
     */
    async handleSubmit() {
      this.errors = this.validateForm(this.user); // Ejecuta la validación del formulario

      if (this.errors.formIsValid) {
        // Solo se ejecuta si el formulario es válido
        try {
          this.loading = true; // Estado de carga a verdadero

          await this.login(this.user); // Intenta iniciar sesión

          // Mensaje de éxito
          this.$toast.open({
            type: 'success',
            message: 'Login successful.',
          });

          this.$router.push({ name: 'home' }); // Redirige a lahome
        } catch (error) {
          // Mensaje de error
          this.$toast.open({
            type: 'error',
            message: 'Invalid username or password. Please try again.',
          });
        } finally {
          this.loading = false; // Restablece el estado de carga
        }
      }
    },
    /**
     * Maneja el evento de cambio para los campos de entrada: valida el valor de entrada y almacena los errores de validación en 'errors'.
     *
     * @param {Event} e - El evento de entrada activado por el usuario.
     * @param {string} inputName - El nombre del campo de entrada que se está validando.
     * @returns {void}
     */
    onChange(e, inputName) {
      const inputValue = e.target.value; // Obtiene el valor actual de la entrada
      const inputErrors = this.validateField(inputName, inputValue); // Valida el valor de la entrada

      if (inputErrors && inputErrors.length) {
        this.errors[inputName] = inputErrors; // Almacena los errores de validación para el campo
      } else {
        this.errors[inputName] = null; // Elimina los errores si el campo es válido
      }
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin__title {
  font-size: 28px;
  font-weight: bold;
  color: black;
}

.form-signin__errors {
  padding-left: 0 !important;
}

.form-signin__error-text {
  font-size: 14px;
  width: 100%;
  color: red;
  text-align: left;
}

.form-signin__button {
  height: 40px;
  width: 100%;
  height: 30px;
}

.form-signin__button span {
  font-size: 16px;
}
</style>
