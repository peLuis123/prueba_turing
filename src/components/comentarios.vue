<template>
    <div class="comments">
        <div class="comment-row">
            <v-card class="comment-card" v-for="(comment, index) in displayedComments" :key="index" max-width="370">
                <div class="comment-actions">
                    <v-btn v-if="comment.userId === currentUserId" color="primary" fab small dark>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn v-if="comment.userId === currentUserId" color="error" @click="deleteComment(comment.id)" fab
                        small dark>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
                <v-divider></v-divider>
                <v-card-text class="comment-text">
                    {{ comment.comment }}
                </v-card-text>
                <v-divider></v-divider>
                <div class="comment-info">
                    <v-rating class="comment-rating" color="warning" v-model="comment.rating" readonly half-increments hover
                        size="24"></v-rating>
                    <div class="d-flex align-center">
                        <v-avatar class="comment-avatar">
                            <img :src="getFullProfileUrl(comment.profile)" alt="User Avatar">
                        </v-avatar>
                        <div class="ml-3">
                            <div class="comment-author">{{ comment.user }}</div>
                            <div class="caption">{{ comment.email }}</div>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
        <v-divider></v-divider>
        <v-pagination v-model="currentPage" :length="totalPages" circle></v-pagination>
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";

export default {
    name: 'comentariosCards',
    data () {
        return {
            currentPage: 1,
            comments: [],
            commentsPerPage: 3,
            currentUserId: '',
        };
    },
    created () {
        this.fetchComments();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            try {
                const decodedToken = jwt_decode(jwtToken);
                this.currentUserId = decodedToken.uid;

            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }

        this.$root.$on("commentAdded", () => {

            this.fetchComments();
        });
        this.$root.$on("userLoggedIn", () => {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                try {
                    const decodedToken = jwt_decode(jwtToken);
                    this.currentUserId = decodedToken.uid;
                    this.fetchComments();
                } catch (error) {
                    console.error('Error al decodificar el token:', error);
                }
            }
        });
        this.$root.$on("userLogout", () => {
            this.currentUserId = ''
            this.fetchComments();

        });




    },
    methods: {
        async fetchComments () {

            try {

                const response = await fetch('http://localhost:3000/v1/comentarios/getcomments');
                const data = await response.json();
                this.comments = data;
                // console.log(data)
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
            }
        },
        async deleteComment (commentId) {
            try {
                const response = await fetch(`http://localhost:3000/v1/comentarios/deletecomment/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log('Comentario eliminado exitosamente');
                    this.fetchComments(); // Actualiza la lista de comentarios
                } else {
                    console.error('Error al eliminar el comentario');
                }
            } catch (error) {
                console.error('Error al eliminar el comentario:', error);
            }
        },
        getFullProfileUrl (profile) {
            return `http://localhost:3000/${profile}`;
        }
    },
    computed: {
        displayedComments () {
            const startIndex = (this.currentPage - 1) * this.commentsPerPage;
            const endIndex = startIndex + this.commentsPerPage;
            return this.comments.slice(startIndex, endIndex);
        },
        totalPages () {
            return Math.ceil(this.comments.length / this.commentsPerPage);
        }
    }
};
</script>

<style scoped>
.comments {

    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.comment-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 20px;
}

.comment-actions {
    display: flex;
    justify-content: flex-end;
}

.comment-card {
    min-width: 350px;
    width: calc(33.33% - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 16px;
}

.comment-content {
    flex: 1;
}

.comment-text {
    font-size: 16px;
    color: #333;
}

.comment-avatar {
    width: 48px;
    height: 48px;
}

.comment-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: auto;
}

.comment-author {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 4px;
}

.caption {
    font-size: 14px;
    color: grey;
}

.comment-rating {
    margin-left: 0;
}
</style>
