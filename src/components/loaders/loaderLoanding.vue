<template>
    <v-overlay :value="show" opacity="0.8">
      <v-progress-circular indeterminate color="primary" size="240"></v-progress-circular>
      <div class="loader-message">Cargando...</div>
    </v-overlay>
  </template>

  <script>
  export default {
    name: 'loaderLoanding',
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
