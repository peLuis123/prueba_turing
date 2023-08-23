<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="deep-purple" dark style="padding: 0 15px">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Portal Administrativo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar>
              <img :src=getProfileImageUrl alt="Profile">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">

              <v-avatar>
                <img :src=getProfileImageUrl alt="Profile">
              </v-avatar>
              <h3>{{ userName }}</h3>
              <p class="text-caption mt-1">{{ userEmail }}</p>

              <v-btn depressed rounded text @click="logout">Cerrar Sesión</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "mainDash",
  data: () => ({
    jwtToken: localStorage.getItem("jwtToken"),
    drawer: false,
    menuItems: [
      { title: 'Personal', icon: 'mdi-view-dashboard', route: '/dashboard/personal' },
      { title: 'Servicios', icon: 'mdi-wrench', route: '/dashboard/services' },
      { title: 'regresar landpage', icon: 'mdi-home', route: '/' }
    ]
  }),
  methods: {
    logout () {
      localStorage.removeItem("jwtToken");
      this.jwtToken = null;
      this.user = null;
    },
  },
  computed: {
    getProfileImageUrl () {

      if (this.userData.profile) {
        return `http://localhost:3000/${this.userData.profile}`;
      }
      return '';
    },


    userData () {
      if (this.jwtToken) {
        const decodedToken = jwt_decode(this.jwtToken);
        return {
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
          profile: decodedToken.profile
        };
      } else {
        return {
          name: "Usuario",
          email: "usuario@prueba.com",
        };
      }
    },
    userName () {
      return this.userData.name;
    },
    userRole () {

      return this.userData.role;

    },
    userEmail () {

      return this.userData.email;

    },
  },
};
</script>
<style scoped>
.sidebar {
  padding-top: 65px;
}
</style>