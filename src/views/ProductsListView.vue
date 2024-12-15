<template>
  <div class="products">
    <logout-button />
    <h1 class="products__title">Product List</h1>
    <div v-if="loading" class="products__loading">Loading...</div>
    <div v-if="error" class="products__error">{{ error }}</div>
    <div v-if="!loading && !error" class="products__items">
      <div v-for="product in products" :key="product.id">
        <product-card
          :product="product"
          @product-favorite-clicked="toggleProductFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductsAPI from '@/api/products-api';
import ProductCard from '@/components/ProductCard.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'ProductsListView',
  components: {
    ProductCard, // Componente de productos individuales
    LogoutButton, // Botón para cerrar sesión
  },
  data() {
    return {
      products: [], // Lista de productos
      loading: true, // Estado que indica si los productos están siendo cargados
      error: null, // Mensaje de error si la carga falla
    };
  },
  async created() {
    await this.fetchProducts(); // Carga los productos cuando el componente es creado
  },
  computed: {
    ...mapGetters('favorites', ['favorites', 'isFavorite']),
  },
  methods: {
    ...mapActions('favorites', ['addFavorite', 'removeFavorite']),
    /**
     * Obtiene los productos desde la API y actualiza la lista.
     * @returns {Promise<void>}
     */
    async fetchProducts() {
      try {
        const { data } = await ProductsAPI.getAll();
        this.products = data.slice(0, 5); // Muestra solo los primeros 5 productos
      } catch (err) {
        this.error = 'Failed to load products'; // Muestra un mensaje de error si la llamada a la API falla
      } finally {
        this.loading = false; // Establece loading en falso una vez que la solicitud está completa
      }
    },
    /**
     * Cambia el estado de favorito de un producto y muestra un mensaje en el toast.
     * @param {Number} productId - El ID del producto a cambiar.
     */
    toggleProductFavorite(productId) {
      if (this.isFavorite(productId)) {
        this.removeFavorite(productId); // Elimina de favoritos
        this.$toast.open({
          type: 'warning',
          message: `Item with ID ${productId} removed from favorites.`,
        });
      } else {
        this.addFavorite(productId); // Añade a favoritos
        this.$toast.open({
          type: 'success',
          message: `Item with ID ${productId} added to favorites`,
        });
      }
    },
  },
};
</script>

<style scoped>
.products {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.products__loading {
  font-size: 18px;
  color: gray;
}

.products__error {
  color: red;
  font-size: 18px;
}

.products__items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 992px) {
  .products__items {
    grid-template-columns: 1fr;
  }
}
</style>
