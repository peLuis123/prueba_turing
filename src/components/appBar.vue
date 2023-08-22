<template>
    <div>
        <v-app-bar class="bottom" height="90" app color="#CFD8DF">
            <div class="d-flex align-center">
                <v-img alt="Logo" class="shrink mr-2" contain src="https://turing-ia.com/assets/img/logo-turing.webp"
                    transition="scale-transition" width="70" />
                <span>TURING-IA</span>
            </div>
            <v-spacer></v-spacer>
            <v-menu offset-y v-for="(menu, index) in menus" :key="index">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                        {{ menu.name }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(submenu, subIndex) in menu.submenus" :key="subIndex">
                        <v-list-item-title>{{ submenu }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
                            <img :src="profileUrl" alt="Profile">
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                            <v-avatar>
                                <img :src="profileUrl" alt="Profile">
                            </v-avatar>
                            <h3>{{ userName }}</h3>
                            <p class="text-caption mt-1">{{ userEmail }}</p>
                            <v-divider class="my-3"></v-divider>
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
                initials: 'JD',
                fullName: 'John Doe',
                email: 'john.doe@doe.com',
            },

            menus: [
                {
                    name: 'Menu 1',
                    submenus: ['Submenu 1', 'Submenu 2']
                },
                {
                    name: 'Menu 2',
                    submenus: ['Submenu A', 'Submenu B']
                }
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
            const profileData = JSON.parse(localStorage.getItem("profile"));
            this.user = {
                fullName: profileData.name,
                email: profileData.email,
                avatarUrl: profileData.avatarUrl
            };
            this.loginModalOpen = false;
        },

        logout () {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("profile");
            this.jwtToken = null;
            this.user = null;
        },



    },
    computed: {
        hasJwtToken () {
            return !!this.jwtToken;
        },
        profileUrl () {
            const profile = localStorage.getItem("profile");
            return profile || "../assets/logo.png";
        },
        userData () {
            if (this.jwtToken) {
                const decodedToken = jwt_decode(this.jwtToken);
                return {
                    name: decodedToken.name,
                    email: decodedToken.email,
                    role: decodedToken.role
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
            // console.log(this.userData.role);
        },
        userEmail () {

            return this.userData.email;

        },
    },
};
</script>

<style scoped></style>
