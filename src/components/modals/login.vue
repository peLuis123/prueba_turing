<template>
  <v-dialog v-model="dialogOpen" max-width="400px">
    <v-card>
      <v-tabs v-model="activeTab" background-color="primary" grow>
        <v-tab>
          Iniciar Sesión
        </v-tab>
        <v-tab>
          Registrar Nueva Cuenta
        </v-tab>
      </v-tabs>

      <v-card-title class="headline">{{ activeTab === 0 ? 'Iniciar Sesión' : 'Registrar Nueva Cuenta' }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="username" label="Correo" v-if="activeTab === 0"></v-text-field>
          <v-text-field v-model="password" label="Contraseña" type="password" v-if="activeTab === 0"></v-text-field>
          <v-text-field v-model="newUsername" label="Nombres Completos" v-if="activeTab === 1"></v-text-field>
          <v-text-field v-model="newEmail" label="Correo Electrónico" type="email" v-if="activeTab === 1"></v-text-field>
          <v-file-input v-if="activeTab === 1" v-model="avatarFile" label="Imagen de Perfil"
            accept=".png,.jpg,.jpeg"></v-file-input>
          <v-text-field v-model="newPassword" label="Contraseña" type="password" v-if="activeTab === 1"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="activeTab === 0" color="primary" @click="login">Iniciar Sesión</v-btn>
        <v-btn v-if="activeTab === 1" color="primary" @click="register">Registrar Cuenta</v-btn>
        <v-btn color="primary" @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { Auth as AuthAPI } from '@/api/auth.js'

export default {

  name: 'LoginModal',
  props: {
    isOpen: Boolean
  },
  computed: {
    dialogOpen: {
      get () {
        return this.isOpen;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  },
  data () {

    return {

      avatarFile: null,
      activeTab: 0,
      username: '',
      password: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
    };
  },
  methods: {
    closeDialog () {
      this.$emit('close');
    },
    async login () {
      try {
        const data = {
          email: this.username,
          password: this.password
        }
        const response = await AuthAPI.login({ data })
        // console.log(response)
        const responseData = response.data
        if (responseData.message === 'Inicio de sesión exitoso') {
          localStorage.setItem('jwtToken', responseData.token);
          this.$emit("login-success");
          this.clearFields()
          this.closeDialog();
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },

    clearFields () {
      this.username = '';
      this.password = '';
      this.newUsername = '';
      this.newEmail = '';
      this.avatarUrl = '';
      this.newPassword = '';
    },
    async register () {
      try {
        if (!this.avatarFile) {
          console.log('Debe seleccionar una imagen');
          return;
        }

        const data = new FormData()

        data.append('avatar', this.avatarFile)
        data.append('role', 'user')
        data.append('name', this.newUsername)
        data.append('email', this.newEmail)
        data.append('password', this.newPassword)

        const response = await AuthAPI.registerUser({ data })
        console.dir('register', response);
        this.clearFields();
        this.closeDialog();
      } catch (error) {
        console.error('Error al registrar cuenta:', error);
      }
    },

  }

};
</script>
