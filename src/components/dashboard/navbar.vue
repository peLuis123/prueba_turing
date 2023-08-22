<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary >
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
    </v-navigation-drawer >
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "mainDash",
  data: () => ({
    drawer: false,
    menuItems: [
      { title: 'Personal', icon: 'mdi-view-dashboard', route: '/dashboard/personal' },
      { title: 'Servicios', icon: 'mdi-wrench', route: '/dashboard/services' },
      { title: 'regresar landpage', icon: 'mdi-home', route: '/' }
    ]
  }),
};
</script>
<style scoped>
.sidebar {
  padding-top: 65px;
}
</style>