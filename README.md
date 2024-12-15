# Prueba Técnica

## Objetivos
El objetivo principal es cumplir con los requerimientos de la prueba técnica, simulando un desarrollo avanzado en un entorno real. Para ello, me he enfocado en todo momento en seguir las mejores prácticas, priorizando siempre un código escalable, mantenible y eficiente.

## Errores Identificados

### 1. Error al instalar dependencias
Al intentar instalar las dependencias del proyecto, encontré un error relacionado con un repositorio privado de Nexus en el archivo `package-lock.json`, lo que impedía la instalación de las dependencias. Para solucionarlo, eliminé el archivo y volví a ejecutar `npm install`, lo que permitió la correcta instalación de las dependencias sin problemas.

### 2. Dependencia faltante
Al intentar ejecutar el proyecto, se presentó un error relacionado con una dependencia faltante: `@popperjs/core`. Este error ocurre porque Bootstrap necesita esta librería para funcionar correctamente. Lo he solucionado instalando la dependencia faltante.

### 3. Emit del componente ProductCard

En el componente ProductCard, el nombre del emit estaba en camelCase (`this.$emit('productFavoriteClicked', this.product.id)`). En la View de productos, donde se recoge el emit, encontramos el siguiente código: `v-on:product-favorite-clicked="toggleProductFavorite(products, product.id)"`. Como podemos ver, el nombre del evento está en kebab-case, mientras que el emit en el componente hijo estaba en camelCase.

A diferencia de los nombres de componentes y props, con los emits no hay transformación automática de nomenclatura. Por lo tanto, siguiendo la recomendación de Vue, he modificado el nombre del evento emitido en el componente hijo a kebab-case.

Además, en el componente padre, en `v-on:product-favorite-clicked="toggleProductFavorite(products, product.id)"`, se observa que se están pasando dos argumentos, lo cual es incorrecto. Aquí debería ir solo el nombre del método al que llama el emit. Por otro lado, el método `toggleProductFavorite` tiene que recibir un solo argumento, ya que el hijo emite solo el id del producto.

### 4: Duplicación de llamadas en created y mounted

En la view de los productos, se realizaban dos llamadas a la API para traer los productos, tanto en el ciclo de vida created como en mounted.
Esto provocaba dos llamadas idénticas a la API, lo que ocasiona una pérdida de rendimiento.
Teniamos una llamada cuando se crea el componente y otra cuando se monta. Hay que eliminar una, decidí eliminar la de mounted porque no necesitamos esperar a que se monte el componente para traernos los productos, tenerla en el created hace que un hipotético usuario perciba la carga de datos más rápida. 

### 5: Falta de async/await para manejar promesa

La llamada a `fetchProducts()` en el hook created de la view de los productos, no se estaba manejando correctamente. El método created debe ser async y se debe utilizar await delante de la promesa de la llamada a la API.
Si no se hace así, tras invocar a `fetchProducts()`, Vue va a continuar con su ciclo de vida, lo que va a provocar que el componente se renderice antes de que la llamada a la API termine, lo que puede resultar en que el componente se muestre con datos incompletos o sin datos, ocasionando comportamientos no deseados.

## Mejoras Implementadas

- Implementación básica de ESLint y Prettier para mejorar la calidad del código.
- Reorganización de la estructura del proyecto para mayor claridad y escalabilidad.
- Implementación de rutas absolutas para facilitar las importaciones.
- Implementación modular de Axios para una mejor organización de las llamadas a API.
- Uso de Vuex para manejar el estado de la aplicación de manera centralizada, simulando una app real con múltiples componentes que dependen de la autenticación de usuarios y la gestión de productos favoritos.
- Implementación de Mixin para manejar formularios de forma más eficiente, facilitando una hipotética reutilización.
- Maquetación con BEM, mejoras en el diseño responsivo y mejoras en accesibilidad.
- Documentación para facilitar la comprensión del proyecto.
- Configuración de pruebas unitarias con Jest, implementando un test para verificar el funcionamiento del login.
