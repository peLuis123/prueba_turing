<template>
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
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "newComentarios",
  data() {
    return {
      newComment: "",
      newRating: null

    };
  },
  methods: {
    addComment() {
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

        fetch("http://localhost:3000/v1/comentarios/addcomment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(commentData)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            this.newComment = "";
            this.newRating = null;
            this.$root.$emit("commentAdded");
          })
          .catch(error => {
            console.error("Error al agregar el comentario:", error);
          });
      }
    }
  }
};
</script>

<style scoped>
.container{
  padding-top: 50px;
}

</style>
