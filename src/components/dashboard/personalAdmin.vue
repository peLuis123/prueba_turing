<template>
    <v-data-table :headers="headers" :items="filteredItems" class="elevation-1 tabla">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Personal Information</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
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
                                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select v-model="editedItem.area" :items="categories" label="Area"></v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-file-input v-model="editedItem.image" accept="image/*"
                                                label="Image"></v-file-input>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn type="submit" color="blue darken-1" text>Save</v-btn>
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
                ¡No hay informacion disponible
            </v-alert>
        </template>
    </v-data-table>
</template>
<script>
import { eventBus } from "@/main";

export default {
    name: "personalCards",
    data: () => ({
        dialog: false,
        headers: [
            { text: "Name", value: "name", sortable: true },
            { text: "Area", value: "area", sortable: true },
            { text: "Description", value: "description", sortable: false },
            { text: "image", value: "image", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            area: "",
            description: "",
            image: "",
        },
        defaultItem: {
            name: "",
            area: "",
            description: "",
        },
        search: "",
        categories: ["Engineering", "Culinary Arts", "Other"],
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? "Añadir nuevo Personal" : "Editar Personal";
        },
        filteredItems () {
            return this.items.filter((item) =>
                item.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },

    watch: {
        dialog (val) {
            val || this.close();
        },
    },

    created () {
        this.fetchAllPersons();
        eventBus.$on("data-changed", this.fetchAllPersons);
    },

    methods: {
        async fetchAllPersons () {
            try {
                const response = await fetch("http://localhost:3000/v1/personal/allpersons");
                if (response.ok) {
                    const allPersons = await response.json();
                    this.items = allPersons.map(item => {
                        item.image = `http://localhost:3000/${item.image}`;
                        return item;
                    });
                } else {
                    console.error("Error al obtener la lista de personas");
                }
            } catch (error) {
                console.error("Error al procesar la solicitud:", error);
            }
        },


        editItem (item) {
            this.editedIndex = this.items.indexOf(item);
            this.editedItem = { ...item };
            this.dialog = true;
        },

        async deleteItem (item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                try {
                    const response = await fetch(`http://localhost:3000/v1/personal/deleteperson/${item.id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        this.items.splice(index, 1);
                        eventBus.$emit("data-changed");
                    } else {
                        console.error("Error al eliminar el registro");
                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
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
                formData.append("area", this.editedItem.area);
                formData.append("description", this.editedItem.description);
                formData.append("image", this.editedItem.image);
                try {
                    const response = await fetch(
                        `http://localhost:3000/v1/personal/editperson/${this.editedItem.id}`,
                        {
                            method: "PUT",
                            body: formData,
                        }
                    );

                    if (response.ok) {
                        const updatedItem = await response.json();
                        this.items.splice(this.editedIndex, 1, updatedItem);
                        eventBus.$emit("data-changed");
                        this.close();
                    } else {
                        console.error("Error al editar el registro");
                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
                }
            } else {
                const formData = new FormData();
                formData.append("name", this.editedItem.name);
                formData.append("area", this.editedItem.area);
                formData.append("description", this.editedItem.description);
                formData.append("image", this.editedItem.image);

                try {
                    const response = await fetch("http://localhost:3000/v1/personal/addperson", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        const newItem = await response.json();
                        this.items.push(newItem);
                        eventBus.$emit("data-changed");
                        this.close();
                    } else {
                        console.error("Error al agregar el registro");
                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
                }
            }
        },
    },
};
</script>
<style scoped >
.tabla {
    margin: 50px 200px;
}

@media (max-width: 820px) {
    .tabla {
        margin: 0;
    }
}
</style>
