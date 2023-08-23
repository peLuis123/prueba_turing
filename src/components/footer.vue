<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Enlaces útiles</h3>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Personal</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Comentarios</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contacto</h3>
        <p>Dirección: Calle Miraflores, Arequipa</p>
        <p>Teléfono: +51 987 654 321</p>
        <p>Correo electrónico: Sanfleet@gmail.com</p>
      </div>
      <div class="footer-section">
        <h3>Redes sociales</h3>
        <div class="social-icons">
          <v-btn class="mx-2" fab small dark color="transparent">
            <v-icon>
              mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn class="mx-2" fab small dark color="transparent">
            <v-icon>
              mdi-twitter
            </v-icon>
          </v-btn>
          <v-btn class="mx-2" fab small dark color="transparent">
            <v-icon>
              mdi-instagram
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Nombre de la Empresa. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footerBottom",
  data () {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
}

.footer-section h3 {
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section a {
  color: #fff;
  text-decoration: none;
}

.social-icons a {
  margin-right: 10px;
  color: #fff;
  font-size: 24px;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
}
</style>
