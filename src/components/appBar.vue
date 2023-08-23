<template>
    <div>
        <v-app-bar class="bottom" height="90" app color="#CFD8DF">
            <div class="d-flex align-center">
                <v-img alt="Logo" class="shrink mr-2" contain src="../../src/assets/img/logoclinica.png"
                    transition="scale-transition" width="70" />
                <span>Clinica Sanfleet</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn v-for="(menu, index) in menus" :key="index" class="mx-2" elevation="0" color="transparent">
                {{ menu.name }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" fab small color="transparent">
                <v-icon>
                    mdi-facebook
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab small color="transparent">
                <v-icon>
                    mdi-twitter
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab small color="transparent">
                <v-icon>
                    mdi-instagram
                </v-icon>
            </v-btn>
            <v-btn v-if="!hasJwtToken" color="transparent" elevation="24" class="ma-2 black--text" @click="openLoginModal">
                Login
                <v-icon right>
                    mdi-login
                </v-icon>
            </v-btn>


            <v-menu v-if="hasJwtToken" bottom min-width="200px" rounded offset-y>
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
                            <v-divider class="my-3" v-if="userRole === 'admin'"></v-divider>
                            <v-btn v-if="userRole === 'admin'" depressed rounded text to="/dashboard">Dashboard</v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn depressed rounded text @click="logout">Cerrar Sesión</v-btn>
                        </div>
                    </v-list-item-content>
                </v-card>
            </v-menu>

            <LoginModal :is-open="loginModalOpen" @close="loginModalOpen = false" @login-success="onLoginSuccess" />
        </v-app-bar>
    </div>
</template>

<script>
import LoginModal from "@/components/modals/login";
import jwt_decode from "jwt-decode";
export default {
    name: 'appBar',
    components: {
        LoginModal
    },
    data () {
        return {
            jwtToken: localStorage.getItem("jwtToken"),
            user: {
                initials: 'NU',
                fullName: 'nombre de usuario',
                email: 'example@correo.com',
            },

            menus: [
                {
                    name: 'Inicio',
                },
                {
                    name: 'Personal',
                },
                {
                    name: 'servicios',
                },
                {
                    name: 'comentarios',
                },

            ],
            loginModalOpen: false
        };
    },
    methods: {

        openLoginModal () {
            this.loginModalOpen = true;
        },
        onLoginSuccess () {
            this.jwtToken = localStorage.getItem("jwtToken");
            const profileData = this.jwtToken
            this.user = {
                fullName: profileData.name,
                email: profileData.email,

            };
            this.$root.$emit("userLoggedIn");
            this.loginModalOpen = false;

        },

        logout () {
            localStorage.removeItem("jwtToken");
            this.jwtToken = null;
            this.user = null;
            this.$root.$emit("userLogout");

        },
    },
    computed: {
        getProfileImageUrl () {

            if (this.userData.profile) {
                return `http://localhost:3000/${this.userData.profile}`;
            }
            return '';
        },
        hasJwtToken () {
            return !!this.jwtToken;
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
