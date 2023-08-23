<template>
    <div class="cards">
      <div class="category-selector">
        <v-select
          v-model="selectedCategory"
          :items="allCategories"
          label="Filtrar por categorías"
          multiple
          outlined
          chips
          @change="filterItemsByCategory(selectedCategory)"
        ></v-select>
      </div>
      <div class="row">
        <v-card v-for="(item, index) in displayedItems" :key="index" class="mx-auto my-12" width="370">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-img class="rounded-oval" height="350" :src="getImageUrl(item.image)"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">{{ item.category }}</div>
            <div>{{ item.description }}</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions class="buttons">
            <v-btn color="deep-purple lighten-2" text>
              Recomendar
            </v-btn>
            <v-btn color="deep-purple lighten-2" text>
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="text-center">
        <v-pagination v-model="currentPage" :length="totalPages" circle></v-pagination>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'personalCards',
    data: () => ({
      originalItems: [],
      items: [],
      allCategories: [],
      selectedCategory: [],
      currentPage: 1,
      itemsPerPage: 3,
    }),
    computed: {
      displayedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.items.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
    },
    created() {
      this.getAllPersons();
    },
    methods: {
      async getAllPersons() {
        try {
          const response = await fetch('http://localhost:3000/v1/personal/allpersons');
          if (response.ok) {
            const allPersons = await response.json();
            this.originalItems = allPersons;
            this.getAllCategories();
            this.items = [...this.originalItems];
          } else {
            console.error('Error al obtener la lista de personas');
          }
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
        }
      },
      getAllCategories() {
        this.allCategories = Array.from(new Set(this.originalItems.map(item => item.category)));
      },
      filterItemsByCategory(selectedCategories) {
        if (selectedCategories.length === 0) {
          this.currentPage = 1;
          this.items = [...this.originalItems];
        } else {
          this.currentPage = 1;
          this.items = this.originalItems.filter(item => selectedCategories.includes(item.category));
        }
      },
      getImageUrl(image) {
        return `http://localhost:3000/${image}`;
      },
    },
  };
  </script>


<style scoped>
.cards {
    background-color: #CED8E0;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 -10px;
    padding: 50px 0;
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
.rounded-oval {
    border-radius: 10%;
}

.buttons {
    justify-content: space-around;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}
</style>
