<template>
  <div class="product-item">
    <span
      @click="onFavoriteClicked"
      class="product-item__favorite-icon"
      :class="{
        'product-item__favorite-icon--selected': isFavorite(product.id),
      }"
      role="button"
      aria-label="Toggle favorite"
    ></span>
    <img
      :src="product.image"
      :alt="product.title"
      class="product-item__image"
    />
    <h3 class="product-item__title">{{ product.title }}</h3>
    <p class="product-item__description">{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('favorites', ['isFavorite']),
  },
  methods: {
    /**
     * Maneja el evento cuando un usuario hace clic en el icono de favorito.
     * Emite un evento para notificar al componente padre con el ID del producto.
     *
     * @returns {void}
     */
    onFavoriteClicked() {
      this.$emit('product-favorite-clicked', this.product.id); // Emite el ID del producto al componente padre para cambiar su estado de favorito
    },
  },
};
</script>

<style scoped>
.product-item {
  position: relative;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.product-item__image {
  width: 150px;
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 10px;
}

.product-item__title {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 2em;
  line-height: 1.8em;
}

.product-item__description {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 3.6em;
  line-height: 1.8em;
}

.product-item__favorite-icon {
  position: absolute;
  right: 20px;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-image: url('@/assets/images/favorite-filled-muted.svg');
}

.product-item__favorite-icon::before {
  content: '';
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  vertical-align: text-bottom;
  background-image: url('@/assets/images/favorite-filled-muted.svg');
}

.product-item__favorite-icon:hover {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  cursor: pointer;
}

.product-item__favorite-icon--selected {
  background-image: url('@/assets/images/favorite-filled-red.svg');
}

.product-item__favorite-icon--selected::before {
  background-image: url('@/assets/images/favorite-filled-red.svg');
}
</style>
