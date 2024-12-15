import AuthAPI from '@/api/auth-api';
import { tokenStorageName } from '@/helpers/constants.js';

// eslint-disable-next-line no-unused-vars
const state = {
  isAuthenticated: false, // Rastrea si el usuario está autenticado
};

const mutations = {
  SET_AUTH(state) {
    // Establece el estado de autenticación a verdadero
    state.isAuthenticated = true;
  },
  LOGOUT(state) {
    // Establece el estado de autenticación a falso
    state.isAuthenticated = false;
  },
};

const actions = {
  async login({ commit }, { username, password }) {
    // Maneja el inicio de sesión del usuario
    try {
      const {
        data: { token },
      } = await AuthAPI.login({ username, password }); // Envía la solicitud de inicio de sesión y obtiene el token
      localStorage.setItem(tokenStorageName, token);
      commit('SET_AUTH');
    } catch (error) {
      throw new Error('An error occurred. Please try again later.'); // Lanza error en caso de fallo
    }
  },
  logout({ commit }) {
    // Maneja el cierre de sesión del usuario
    localStorage.removeItem(tokenStorageName); // Elimina el token de localStorage
    commit('LOGOUT');
  },
};

const getters = {
  isAuthenticated(state) {
    // Retorna el estado de autenticación
    return state.isAuthenticated || !!localStorage.getItem(tokenStorageName);
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
};
