import api from '@/lib/axios';

export default {
  /**
   * Obtiene una lista de todos los productos desde la API.
   *
   * @returns {Promise} - La promesa que se resuelve con la lista de productos.
   */
  getAll() {
    return api.get('/products');
  },
};
