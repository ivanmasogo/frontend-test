import { PASSWORD_REGEX } from '@/helpers/regex';

const validationMixin = {
  data: () => ({
    // Define las reglas de validación para cada campo de entrada
    validationRules: {
      username: {
        // Reglas de validación para el campo de nombre de usuario
        rules: [
          (value) => !!value || 'Username is required.', // Verifica si el nombre de usuario no está vacío
          (value) =>
            value.length <= 12 || 'Username must be less than 12 characters.', // Verifica si el nombre de usuario tiene 12 caracteres o menos
        ],
      },
      password: {
        // Regla de validación para el campo de contraseña
        rules: [
          (value) =>
            PASSWORD_REGEX.test(value) ||
            'Password must be at least 6 characters long, contain at least one letter, one number, and one special character.', // Valida el formato de la contraseña usando regex
        ],
      },
    },
  }),
  methods: {
    /**
     * Valida un solo campo basado en su nombre y valor.
     * Retorna un arreglo de mensajes de error si la validación falla.
     *
     * @param {string} inputName - El nombre del campo a validar.
     * @param {string} value - El valor del campo a validar.
     * @returns {Array<string>} - Un arreglo de mensajes de error (vacío si la validación pasa).
     */
    validateField(inputName, value) {
      // Itera sobre todas las reglas para el campo específico y las aplica
      return this.validationRules[inputName].rules
        .filter((rule) => {
          const isValid = rule(value); // Ejecuta la regla y verifica si es válida

          // Si la validación falla, retorna el mensaje de error
          if (isValid !== true) {
            return isValid;
          }
        })
        .map((rule) => rule(value)); // Mapea las reglas de validación fallidas a los mensajes de error
    },
    /**
     * Valida todo el formulario iterando sobre todos los campos y verificando su validez.
     * Retorna un objeto que contiene los mensajes de error para cada campo y un indicador de si el formulario es válido.
     *
     * @param {Object} form - El objeto del formulario a validar.
     * @returns {Object} - El objeto de errores del formulario que contiene los errores de cada campo y un indicador 'formIsValid'.
     */
    validateForm(form) {
      const formErrors = {}; // Almacena los errores para cada campo
      let formIsValid = true; // Rastrea si todo el formulario es válido

      // Itera sobre cada campo del formulario y lo valida
      for (let property in form) {
        const errors = this.validateField(property, form[property]);

        // Si algún campo tiene errores, marca el formulario como no válido
        if (errors.length) {
          formIsValid = false;
        }

        formErrors[property] = errors; // Almacena los errores para cada campo
      }

      // Agrega el estado de validez general del formulario
      formErrors.formIsValid = formIsValid;

      return formErrors; // Retorna los errores del formulario y el estado de validez
    },
  },
};

export default validationMixin;
