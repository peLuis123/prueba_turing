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

  data() {
    return {
      items: [
        {
          src: bannerImage1,
          title: 'Título de la primera imagen',
          description: 'Descripción de la primera imagen...',
        },
        {
          src: bannerImage2,
          title: 'Título de la segunda imagen',
          description: 'Descripción de la segunda imagen...',
        },
      ],
    };
  },
  methods: {
    showDetails(item) {
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
