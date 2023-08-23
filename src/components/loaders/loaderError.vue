<template>
    <v-overlay :value="show" opacity="0.8">
      <v-icon color="error" size="240">mdi-alert-circle-outline</v-icon>
      <div class="loader-message">¡Error en la operación!</div>
    </v-overlay>
  </template>

  <script>
  export default {
    name: 'loaderError',
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
