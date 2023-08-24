<template>
  <v-carousel :interval="3000" cycle height="1200" hide-delimiters :show-arrows="false">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      <div class="carousel-item-content">
        <div class="item-text">
          <h2 class="item-title">{{ item.title }}</h2>
          <p class="item-description">{{ item.description }}</p>
          <v-btn color="primary" @click="showDetails(item)">Más Información</v-btn>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import bannerImage1 from '@/assets/img/portada1.jpg';
import bannerImage2 from '@/assets/img/banner1.png';
export default {
  name: 'portadaComponent',

  data () {
    return {
      items: [
        {
          src: bannerImage1,
          title: 'Bienvenido a Nuestra Clínica: Tu Salud es Nuestra Prioridad',
          description: 'Descubre una atención médica de calidad en nuestra clínica, donde cuidamos de ti con pasión y experiencia. Ofrecemos una amplia gama de servicios médicos y tratamientos para promover tu bienestar integral.',
        },
        {
          src: bannerImage2,
          title: 'Explora Nuestros Servicios Médicos',
          description: 'En nuestra clínica, te acompañamos en tu búsqueda de salud y calidad de vida. Descubre una variedad de servicios médicos especializados, desde prevención y diagnóstico hasta tratamientos avanzados, brindados por un equipo comprometido con tu bienestar y comodidad',
        },
      ],
    };
  },
  methods: {
    showDetails (item) {
      console.log(item.title)
    },
  },
};
</script>

<style scoped>
.carousel-item-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.item-text {
  text-align: center;
  color: black;
}

.item-title {
  font-weight: bold;
  font-size: 3vw;
  margin-bottom: 10px;
}

.item-description {
  font-size: 1.5vw;
  margin-bottom: 20px;
}

.item-text v-btn {
  margin-top: 15px;
}
</style>
