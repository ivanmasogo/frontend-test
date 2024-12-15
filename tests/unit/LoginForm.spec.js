import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  login: jest.fn(),
};

const store = new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      actions,
    },
  },
});

const wrapper = shallowMount(LoginForm, {
  store,
  localVue,
  mocks: {
    $toast: { open: jest.fn() },
    $router: { push: jest.fn() },
  },
});

describe('LoginForm.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot(); // Compara la salida HTML con el snapshot
  });

  it('shows validation errors when username and password are invalid', async () => {
    const inputUsername = wrapper.find('input#username');
    const inputPassword = wrapper.find('input#password');

    // Entradas vacías
    await inputUsername.setValue('');
    await inputPassword.setValue('');

    // Verificar los errores de validación
    expect(wrapper.vm.errors.username).toBeTruthy();
    expect(wrapper.vm.errors.password).toBeTruthy();
  });

  it('does not show validation errors when username and password are valid', async () => {
    const inputUsername = wrapper.find('input#username');
    const inputPassword = wrapper.find('input#password');

    // Entrada con usuario y contraseña válidos
    await inputUsername.setValue('mor_2314');
    await inputPassword.setValue('83r5^_');

    // Verificar que no haya errores de validación
    expect(wrapper.vm.errors.username).toBeFalsy();
    expect(wrapper.vm.errors.password).toBeFalsy();
  });

  it('calls login action and shows success toast when login is successful', async () => {
    // Entrada válida para el nombre de usuario y la contraseña
    await wrapper.setData({
      user: { username: 'mor_2314', password: '83r5^_' },
    });

    // Simular el envío del formulario
    await wrapper.vm.handleSubmit();

    // Esperar que la acción de login sea llamada con el usuario y contraseña correctos
    expect(actions.login).toHaveBeenCalledWith(expect.anything(), {
      username: 'mor_2314',
      password: '83r5^_',
    });

    // Esperar que se muestre el toast de éxito
    expect(wrapper.vm.$toast.open).toHaveBeenCalledWith({
      type: 'success',
      message: 'Login successful.',
    });

    // Esperar que el router redirija a la página de inicio
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home' });
  });

  it('shows error toast when login fails', async () => {
    // Simular un fallo en la acción de login
    actions.login.mockRejectedValue(
      new Error('An error occurred. Please try again later.')
    );

    // Simular entrada inválida de usuario
    await wrapper.setData({
      user: { username: 'mor_2314', password: '83r5^_1' },
    });

    // Simular el envío del formulario
    await wrapper.vm.handleSubmit();

    // Esperar que se muestre el toast de error
    expect(wrapper.vm.$toast.open).toHaveBeenCalledWith({
      type: 'error',
      message: 'Invalid username or password. Please try again.',
    });
  });
});
