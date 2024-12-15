import { favoritesStorageName } from '@/helpers/constants.js';

const state = {
  favorites: JSON.parse(localStorage.getItem(favoritesStorageName)) || [], // Cargar favoritos desde localStorage, si no hay, usar un arreglo vacío
};

const mutations = {
  ADD_FAVORITE(state, item) {
    // Agregar ítem a favoritos
    state.favorites.push(item); // Añadir el ítem al arreglo de favoritos
    localStorage.setItem(favoritesStorageName, JSON.stringify(state.favorites)); // Guardar los favoritos actualizados en localStorage
  },
  REMOVE_FAVORITE(state, item) {
    // Eliminar ítem de favoritos
    state.favorites = state.favorites.filter((favorite) => favorite !== item); // Filtrar el ítem de los favoritos
    localStorage.setItem(favoritesStorageName, JSON.stringify(state.favorites)); // Guardar los favoritos actualizados en localStorage
  },
};

const actions = {
  addFavorite({ commit }, item) {
    // Agrega ítem a favoritos (si no está ya en favoritos)
    if (!state.favorites.includes(item)) {
      // Verificar si el ítem ya está en favoritos
      commit('ADD_FAVORITE', item);
    }
  },
  removeFavorite({ commit }, item) {
    // Elimina ítem de favoritos
    if (state.favorites.includes(item)) {
      // Verificar si el ítem ya está en favoritos
      commit('REMOVE_FAVORITE', item);
    }
  },
  removeToken() {
    // Elimina los favoritos de localStorage
    localStorage.removeItem(favoritesStorageName);
  },
};

const getters = {
  favorites(state) {
    // Retorna la lista de ítems favoritos
    return state.favorites;
  },
  isFavorite: (state) => (item) => {
    // Verifica si el ítem está en la lista de favoritos
    return state.favorites.includes(item);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
