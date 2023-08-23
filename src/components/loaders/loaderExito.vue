<template>
    <v-overlay :value="show" opacity="0.8">
      <v-icon color="success" size="240">mdi-check-circle</v-icon>
      <div class="loader-message">¡Operación exitosa!</div>
    </v-overlay>
  </template>

  <script>
  export default {
    name: 'loaderExito',
    props: {
      show: Boolean
    }
  };
  </script>

  <style scoped>

  .loader-message {
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
  }
  </style>