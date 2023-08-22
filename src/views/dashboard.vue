<template>
  <v-app>
    <navbarDash />
    <v-main style="background-color: #CED8E0;">
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import navbarDash from "../components/dashboard/navbar"

export default {

  name: 'dashboardView',

  components: {
    navbarDash,
  }
}
</script>
