import api from '@/lib/axios';

export default {
  /**
   * Envía una solicitud POST al endpoint de inicio de sesión con los datos proporcionados
   *
   * @param {Object} data - Las datos de inicio de sesión.
   * @returns {Promise} - La promesa que se resuelve con la respuesta de la API.
   */

  login(data) {
    return api.post('/auth/login', data);
  },
};
