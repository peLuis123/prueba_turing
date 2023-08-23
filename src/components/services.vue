<template>
    <div class="services">
      <div class="category-selector">
        <v-select
          v-model="selectedCategory"
          :items="allCategories"
          label="Filtrar por categorías"
          multiple
          outlined
          chips
          @change="filterServicesByCategories(selectedCategory)"
        ></v-select>
      </div>
      <div class="row">
        <v-card
          v-for="(service, index) in displayedServices"
          :key="index"
          class="mx-auto my-12"
          max-width="370"
        >
          <v-img class="service-image" :src="getImageUrl(service.image)"></v-img>
          <v-card-title>{{ service.name }}</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">{{ service.category }}</div>
            <div>{{ service.description }}</div>
            <div class="mt-2 text-h5">${{ service.price }}</div>
          </v-card-text>
        </v-card>
      </div>
      <div class="text-center">
        <v-pagination v-model="currentPage" :length="totalPages" circle></v-pagination>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'ServiciosClinica',
    data: () => ({
      allCategories: [],
      selectedCategory: '',
      originalServices: [], // Add your service data here
      services: [],
      currentPage: 1,
      servicesPerPage: 3,
    }),
    computed: {
      displayedServices() {
        const startIndex = (this.currentPage - 1) * this.servicesPerPage;
        const endIndex = startIndex + this.servicesPerPage;
        return this.services.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.services.length / this.servicesPerPage);
      },
    },
    created() {
      this.getAllServices();
    },
    methods: {
      async getAllServices() {
        try {
          const response = await fetch('http://localhost:3000/v1/services/allservices');
          if (response.ok) {
            const allServices = await response.json();
            this.originalServices = allServices;
            this.getAllCategories();
            this.services = [...this.originalServices];
          } else {
            console.error('Error al obtener la lista de servicios');
          }
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
        }
      },
      getAllCategories() {
        this.allCategories = Array.from(new Set(this.originalServices.map(service => service.category)));
      },
      filterServicesByCategories(categories) {
        if (categories.length === 0) {
          this.currentPage = 1;
          this.services = [...this.originalServices];
        } else {
          this.currentPage = 1;
          this.services = this.originalServices.filter(service => categories.includes(service.category));
        }
      },
      getImageUrl(image) {
        return `http://localhost:3000/${image}`;
      },
    },
  };
  </script>
<style scoped>
.services {
    background-color: #1BC8A0;
    padding: 50px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 -10px;
    flex-direction: column;
}
.category-selector {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    max-width: 450px;
    width: 100%;
    min-width: 200px;
    margin: 0 auto;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

.service-image {
    height: 250px;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
}
</style>
