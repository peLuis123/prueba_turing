<template>
    <div class="cards">
        <div class="category-selector">
            <v-select v-model="selectedCategory" :items="allCategories" label="Filtrar por categorías" multiple outlined
                chips @change="filterItemsByCategory(selectedCategory)"></v-select>
        </div>
        <div class="row">
            <v-card v-for="(item, index) in displayedItems" :key="index" class="mx-auto my-12" max-width="370">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>
                <v-img class="rounded-oval" height="350" :src="item.image"></v-img>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-text>
                    <div class="my-4 text-subtitle-1">
                        {{ item.category }}
                    </div>
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
        originalItems: [
            {
                name: 'Jane Smith',
                category: 'Engineering',
                description: 'Mechanical engineer with a passion for sustainable design.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-3.jpg',
            },
            {
                name: 'Jane Smith',
                category: 'Engineering',
                description: 'Mechanical engineer with a passion for sustainable design.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-3.jpg',
            },
            {
                name: 'Jane Smith',
                category: 'Engineering',
                description: 'Mechanical engineer with a passion for sustainable design.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-3.jpg',
            },
            {
                name: 'Alex Johnson',
                category: 'Culinary Arts',
                description: 'Executive chef known for creating innovative and delicious dishes.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-1.jpg',
            },
            {
                name: 'Alex Johnson',
                category: 'Culinary Arts',
                description: 'Executive chef known for creating innovative and delicious dishes.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-1.jpg',
            },
            {
                name: 'Alex Johnson',
                category: 'Culinary Arts',
                description: 'Executive chef known for creating innovative and delicious dishes.',
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/team-1.jpg',
            },

        ],
        items: [],
        allCategories: ['Engineering','Culinary Arts'],
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
        this.getAllCategories();
        this.items = [...this.originalItems];
    },
    methods: {
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
