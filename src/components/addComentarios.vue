<template>
  <div class="main">
    <div class="container">
      <v-card class="comentarios">
        <v-card-title>Agregar Comentario</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="addComment">
            <v-textarea v-model="newComment" label="Comentario"></v-textarea>
            <v-rating v-model="newRating" label="Calificación" clearable></v-rating>
            <v-btn color="primary" @click="addComment">Agregar Comentario</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <loaderError :show="errorLoader" />
      <LoaderLoading :show="loading" />
      <LoaderSuccess :show="success" />
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import loaderError from "./loaders/loaderError";
import LoaderLoading from "./loaders/loaderLoanding";
import LoaderSuccess from "./loaders/loaderExito";
import { comentarios as comentariosAPI } from '@/api/comentarios.js'
export default {
  name: "newComentarios",
  components: {
    loaderError,
    LoaderLoading,
    LoaderSuccess
  },
  data () {
    return {
      newComment: "",
      errorLoader: false,
      loading: false,
      success: false,
      newRating: null

    };
  },
  methods: {
    async addComment () {
      try {
        if (this.$refs.form.validate()) {
        const jwtToken = localStorage.getItem("jwtToken");
        const decodedToken = jwt_decode(jwtToken);

        const commentData = {
          userId: decodedToken.uid,
          user: decodedToken.name,
          email: decodedToken.email,
          profile: decodedToken.profile,
          rating: this.newRating,
          comment: this.newComment
        };
        console.log(commentData)
        this.loading = true;
        this.success = false;
        const response = await comentariosAPI.addComents({ commentData })
        console.log(response);
        this.newComment = "";
        this.newRating = null;
        this.success = true;

        }
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
        this.errorLoader = true;
      }
      finally {
        this.$root.$emit("commentAdded");
        this.loading = false;
        setTimeout(() => {
          this.success = false;
        }, 2000);
        setTimeout(() => {
          this.errorLoader = false;
        }, 2000);
      }
      // if (this.$refs.form.validate()) {
      //   const jwtToken = localStorage.getItem("jwtToken");
      //   const decodedToken = jwt_decode(jwtToken);

      //   const commentData = {
      //     userId: decodedToken.uid,
      //     user: decodedToken.name,
      //     email: decodedToken.email,
      //     profile: decodedToken.profile,
      //     rating: this.newRating,
      //     comment: this.newComment
      //   };
      //   this.loading = true;
      //   this.success = false;

      // fetch("http://localhost:3000/v1/comentarios/addcomment", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(commentData)
      // })
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json();
      //     } else {
      //       throw new Error("Error al agregar el comentario");
      //     }
      //   })
      //   .then(data => {
      //     console.log(data.message);
      //     this.newComment = "";
      //     this.newRating = null;
      //     this.$root.$emit("commentAdded");
      //     this.success = true;
      //   })
      //   .catch(error => {
      //     console.error("Error al agregar el comentario:", error);
      //     this.errorLoader = true;
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //     setTimeout(() => {
      //       this.success = false;
      //     }, 2000);
      //     setTimeout(() => {
      //       this.errorLoader = false;
      //     }, 2000);
      //   });
    }
  }

};
</script>

<style scoped>
.main {
  background-color: #CFD8DF;
}

.container {
  padding: 50px 0
}
</style>
