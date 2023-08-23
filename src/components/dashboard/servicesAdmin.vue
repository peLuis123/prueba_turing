<template>
    <div>
        <v-data-table :headers="headers" :search="search" :items="items" class="elevation-1 tabla">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Informacion de los servicios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                        hide-details></v-text-field>

                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Añadir</v-btn>
                        </template>
                        <v-card>
                            <form @submit.prevent="save">
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select v-model="editedItem.category" :items="categories"
                                                    label="Categoria"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field v-model="editedItem.price" label="Precio"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-file-input v-model="editedItem.image" accept="image/*"
                                                    label="Imagen"></v-file-input>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-textarea v-model="editedItem.description"
                                                    label="Descripcion"></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                    <v-btn type="submit" color="blue darken-1" text>Guardar</v-btn>
                                </v-card-actions>
                            </form>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
                <v-alert type="warning" class="mb-2" icon="mdi-alert-circle-outline">
                    No information available
                </v-alert>
            </template>

        </v-data-table>
        <loaderError :show="errorLoader" />
        <LoaderLoading :show="loading" />
        <LoaderSuccess :show="success" />
    </div>
</template>

<script>
import loaderError from "../loaders/loaderError";
import LoaderLoading from "../loaders/loaderLoanding";
import LoaderSuccess from "../loaders/loaderExito";
export default {
    name: "serviceCards",
    components: {
        loaderError,
        LoaderLoading,
        LoaderSuccess
    },
    data: () => ({
        dialog: false,
        errorLoader: false,
        loading: false,
        success: false,
        headers: [
            { text: "Nombre", value: "name", sortable: true },
            { text: "Categoria", value: "category", sortable: true },
            { text: "Precio", value: "price", sortable: true },
            { text: "Descripcion", value: "description", sortable: false },
            { text: "Image", value: "image", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
            id: "",
            name: "",
            category: "",
            price: "",
            description: "",
            image: null,
        },
        defaultItem: {
            name: "",
            category: "",
            price: "",
            description: "",
        },
        search: "",
        categories: [],
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? "Add New Service" : "Edit Service";
        },
    },

    watch: {
        dialog (val) {
            val || this.close();
        },
    },

    created () {
        this.fetchAllServices();
        this.fetchCategories();
    },

    methods: {
        async fetchCategories () {
            try {
                const response = await fetch('http://localhost:3000/v1/categorias/allservices');
                if (response.ok) {
                    const categories = await response.json();
                    this.categories = categories;
                } else {
                    console.error('Error al obtener las categorías');
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        },

        async fetchAllServices () {
            try {
                const response = await fetch("http://localhost:3000/v1/services/allservices");
                if (response.ok) {
                    const allServices = await response.json();
                    this.items = allServices.map((item) => {
                        item.image = `http://localhost:3000/${item.image}`;
                        return item;
                    });
                } else {
                    console.error("Error fetching services list");
                }
            } catch (error) {
                console.error("Error processing request:", error);
            }
        },

        editItem (item) {
            this.editedIndex = this.items.indexOf(item);
            this.editedItem.id = item.id;
            this.editedItem.name = item.name;
            this.editedItem.category = item.category;
            this.editedItem.price = item.price;
            this.editedItem.description = item.description;
            this.editedItem.image = null;
            this.dialog = true;
            console.log(this.editedItem)
        },

        async deleteItem (item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                try {
                    this.loading = true;

                    const response = await fetch(`http://localhost:3000/v1/services/deleteservice/${item.id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        this.items.splice(index, 1);
                        this.success = true;
                    } else {
                        console.error("Error deleting service");
                        this.errorLoader = true;
                    }
                } catch (error) {
                    console.error("Error processing request:", error);
                    this.errorLoader = true;
                } finally {
                    this.loading = false;
                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                    setTimeout(() => {
                        this.errorLoader = false;
                    }, 2000);
                }
            }
        },


        close () {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = { ...this.defaultItem };
                this.editedIndex = -1;
            });
        },
        async save () {
            if (this.editedIndex > -1) {
                const formData = new FormData();
                formData.append("name", this.editedItem.name);
                formData.append("category", this.editedItem.category);
                formData.append("price", this.editedItem.price);
                formData.append("description", this.editedItem.description);
                formData.append("image", this.editedItem.image);

                try {
                    this.loading = true;

                    const response = await fetch(
                        `http://localhost:3000/v1/services/editservice/${this.editedItem.id}`,
                        {
                            method: "PUT",
                            body: formData,
                        }
                    );

                    if (response.ok) {
                        const updatedItem = await response.json();
                        this.items.splice(this.editedIndex, 1, updatedItem);
                        this.fetchAllServices();
                        this.close();
                        this.success = true;
                    } else {
                        console.error("Error editing service");
                        this.close();
                        this.errorLoader = true;
                    }
                } catch (error) {
                    console.error("Error processing request:", error);
                    this.close();
                    this.errorLoader = true;
                } finally {
                    this.loading = false;
                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                    setTimeout(() => {
                        this.errorLoader = false;
                    }, 2000);
                }
            } else {
                const formData = new FormData();
                formData.append("name", this.editedItem.name);
                formData.append("category", this.editedItem.category);
                formData.append("price", this.editedItem.price); // New price field
                formData.append("description", this.editedItem.description);
                formData.append("image", this.editedItem.image);

                try {
                    this.loading = true;

                    const response = await fetch("http://localhost:3000/v1/services/addservice", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        const newService = await response.json();
                        this.items.push(newService);
                        this.fetchAllServices();
                        this.close();
                        this.success = true;
                    } else {
                        console.error("Error adding service");
                        this.close();
                        this.errorLoader = true;
                    }
                } catch (error) {
                    console.error("Error processing request:", error);
                    this.close();
                    this.errorLoader = true;
                } finally {
                    this.loading = false;
                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                    setTimeout(() => {
                        this.errorLoader = false;
                    }, 2000);
                }
            }
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
