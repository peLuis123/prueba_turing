<template>
    <div>
        <v-data-table :headers="headers" :search="search" :items="items" class="elevation-1 tabla">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Informacion del Personal</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
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
                                                <v-select v-model="editedItem.area" :items="areas" label="Area"></v-select>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-file-input v-model="editedItem.image" accept="image/*"
                                                    label="Perfil"></v-file-input>
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
                    ¡No hay informacion disponible
                </v-alert>
            </template>
        </v-data-table>
        <loaderError :show="errorLoader"/>
        <LoaderLoading :show="loading" />
        <LoaderSuccess :show="success" />
    </div>
</template>
<script>
import loaderError from "../loaders/loaderError";
import LoaderLoading from "../loaders/loaderLoanding";
import LoaderSuccess from "../loaders/loaderExito";
import { categoria as cateAPI } from '@/api/categoria.js'
import { personal as personalAPI } from '@/api/personal.js'

export default {
    name: "personalCards",
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
            { text: "Area", value: "area", sortable: true },
            { text: "Descripcion", value: "description", sortable: false },
            { text: "Perfil", value: "image", sortable: false },
            { text: "Acciones", value: "actions", sortable: false },
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
            id: "",
            name: "",
            area: "",
            description: "",
            image: null,
        },
        defaultItem: {
            name: "",
            area: "",
            description: "",

        },
        search: "",
        areas: [],
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? "Añadir nuevo Personal" : "Editar Personal";
        },

    },

    watch: {
        dialog (val) {
            val || this.close();
        },
    },
    created () {
        this.fetchAllPersons();
        this.fetchAllAreas();
    },
    methods: {
        async fetchAllAreas () {
            try {
                const response = await cateAPI.allareas
                // console.log(response)
                if (response.status >= 200 && response.status < 300) {
                    const areas = await response.data;
                    this.areas = areas;
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        },
        async fetchAllPersons () {
            try {
                const response = await await personalAPI.allpersons
                // console.log(response)
                if (response.status >= 200 && response.status < 300) {
                    const allPersons = await response.data;
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
            console.log(item.id)
            this.editedIndex = this.items.indexOf(item);
            this.editedItem.area = item.area;
            this.editedItem.id = item.id;
            this.editedItem.description = item.description;
            this.editedItem.name = item.name;
            this.editedItem.image = null
            this.dialog = true;
        },

        async deleteItem (item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                try {
                    this.loading = true;

                    const response = await fetch(`http://localhost:3000/v1/personal/deleteperson/${item.id}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        this.success = true;
                        this.items.splice(index, 1);
                    } else {
                        console.error("Error al eliminar el registro");
                        this.errorLoader = true;

                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
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
                formData.append("area", this.editedItem.area);
                formData.append("description", this.editedItem.description);
                formData.append("image", this.editedItem.image);

                try {
                    this.loading = true;
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
                        this.fetchAllPersons();
                        this.close();
                        this.success = true;
                    } else {
                        console.error("Error al editar el registro");
                        this.close();
                        this.errorLoader = true;
                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
                    this.close();
                    this.errorLoader = true;
                } finally {
                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                    this.loading = false;
                    setTimeout(() => {
                        this.errorLoader = false;
                    }, 2000);
                }
            } else {
                this.loading = true;
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
                        this.success = true;
                        const newItem = await response.json();
                        this.items.push(newItem);
                        this.fetchAllPersons();
                        this.close();

                    } else {
                        console.error("Error al agregar el registro");
                        this.close();
                        this.errorLoader = true;


                    }
                } catch (error) {
                    console.error("Error al procesar la solicitud:", error);
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
        }
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
