<template>
    <v-data-table :headers="headers" :items="filteredItems" class="elevation-1 tabla">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Service Information</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select v-model="editedItem.category" :items="categories"
                                            label="Category"></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-alert type="warning" class="mb-2" icon="mdi-alert-circle-outline">
                ¡No hay información disponible!
            </v-alert>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: "serviceCards",
    data: () => ({
        dialog: false,
        headers: [
            { text: "Name", value: "name", sortable: true },
            { text: "Category", value: "category", sortable: true },
            { text: "Description", value: "description", sortable: false },
            { text: "Price", value: "price", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        items: [
            {
                name: 'Consulta Médica General',
                category: 'Medicina General',
                description: 'Examen médico completo y diagnóstico inicial.',
                price: 80.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-25-370x227.jpg',
            },
            {
                name: 'Exámenes de Laboratorio',
                category: 'Diagnóstico',
                description: 'Realización y análisis de pruebas de laboratorio.',
                price: 50.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-23-370x227.jpg',
            },
            {
                name: 'Consulta Médica General',
                category: 'Medicina General',
                description: 'Examen médico completo y diagnóstico inicial.',
                price: 80.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-25-370x227.jpg',
            },
            {
                name: 'Exámenes de Laboratorio',
                category: 'Diagnóstico',
                description: 'Realización y análisis de pruebas de laboratorio.',
                price: 50.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-23-370x227.jpg',
            },
            {
                name: 'Consulta Médica General',
                category: 'Medicina General',
                description: 'Examen médico completo y diagnóstico inicial.',
                price: 80.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-25-370x227.jpg',
            },
            {
                name: 'Exámenes de Laboratorio',
                category: 'Diagnóstico',
                description: 'Realización y análisis de pruebas de laboratorio.',
                price: 50.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-23-370x227.jpg',
            },
            {
                name: 'Consulta Médica General',
                category: 'Medicina General',
                description: 'Examen médico completo y diagnóstico inicial.',
                price: 80.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-25-370x227.jpg',
            },
            {
                name: 'Exámenes de Laboratorio',
                category: '1',
                description: 'Realización y análisis de pruebas de laboratorio.',
                price: 50.00,
                image: 'https://laborex.smartdemowp.com/wp-content/uploads/2021/05/news-23-370x227.jpg',
            },
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            category: "",
            description: "",
            price: "",
        },
        defaultItem: {
            name: "",
            category: "",
            description: "",
            price: "",
        },
        search: "",
        categories: ["Diagnóstico", "laboratorio", "Other"],
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
        filteredItems () {
            return this.items.filter(item =>
                item.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },

    watch: {
        dialog (val) {
            val || this.close();
        },
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.items.indexOf(item);
            this.editedItem = { ...item };
            this.dialog = true;
        },
        deleteItem (item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        close () {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = { ...this.defaultItem };
                this.editedIndex = -1;
            });
        },
        save () {
            if (this.editedIndex > -1) {
                this.items[this.editedIndex] = { ...this.editedItem };
            } else {
                this.items.push({ ...this.editedItem, actions: true });
            }
            this.close();
        },
    },
};
</script>

<style scoped>
.tabla {
    margin: 50px 200px;
}

@media (max-width: 820px) {
    .tabla {
        margin: 0;
    }
}
</style>
