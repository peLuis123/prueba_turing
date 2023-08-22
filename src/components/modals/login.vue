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

          <v-file-input v-model="profileImage" name="profileImage" :rules="rules"
            accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera"
            label="Avatar"></v-file-input>

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

      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      activeTab: 0,
      username: '',
      password: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
      profileImage: null,
    };
  },
  methods: {
    closeDialog () {
      this.$emit('close');
    },
    async login () {
      try {
        const response = await fetch('http://localhost:3000/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password
          })
        });

        const data = await response.json();

        if (data.message === 'Inicio de sesión exitoso') {
          localStorage.setItem('jwtToken', data.token);
          this.closeDialog();
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    async register () {
      try {
        const formData = new FormData();
        formData.append('role', 'user');
        formData.append('name', this.newUsername);
        formData.append('email', this.newEmail);
        formData.append('password', this.newPassword);
        formData.append('profileImage', this.profileImage[0]);
        console.log('Profile Image:', this.profileImage);

        const response = await fetch('http://localhost:3000/v1/auth/register', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.message === 'Usuario registrado exitosamente') {
          console.log('Usuario registrado exitosament')
          this.closeDialog();
        } else {
          console.log('Usuario no registrado')
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
    async loginWithEmailAndPassword (email, password) {
      try {
        const response = await fetch('http://localhost:3000/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();

        if (data.message === 'Inicio de sesión exitoso') {
          localStorage.setItem('jwtToken', data.token);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
  }
};
</script>
