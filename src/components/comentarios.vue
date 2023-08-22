<template>
    <div class="comments">
        <div class="comment-row">
            <v-card class="comment-card" v-for="(comment, index) in displayedComments" :key="index" max-width="370">
                <v-card-text class="comment-text">
                    {{ comment.text }}
                </v-card-text>

                <v-divider></v-divider>
                <div class="comment-info">
                    <v-rating class="comment-rating" color="warning" v-model="comment.rating" readonly half-increments hover size="24"></v-rating>
                    <div class="d-flex align-center">
                        <v-avatar class="comment-avatar">
                            <img :src="comment.avatar" alt="User Avatar">
                        </v-avatar>
                        <div class="ml-3">
                            <div class="comment-author">{{ comment.author }}</div>
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
export default {
    name: 'comentariosCards',
    data () {
        return {
            currentPage: 1,
            comments: [
                { author: "Usuario 1", text: "son un equipo talentoso son un equipo talentoso son un equipo talentoso son un equipo talentoso", rating: 4, avatar: "https://cdn.vuetifyjs.com/images/john.jpg", email: "usuario1@example.com", date: "2023-08-01" },
                { author: "Usuario 2", text: "Comentario 2", rating: 5, avatar: "https://cdn.vuetifyjs.com/images/john.jpg", email: "usuario2@example.com", date: "2023-08-02" },
                { author: "Usuario 3", text: "Comentario 3", rating: 3, avatar: "https://cdn.vuetifyjs.com/images/john.jpg", email: "usuario3@example.com", date: "2023-08-03" },
                { author: "Usuario 4", text: "Comentario 4", rating: 2, avatar: "https://cdn.vuetifyjs.com/images/john.jpg", email: "usuario4@example.com", date: "2023-08-04" },

            ],
            commentsPerPage: 3,
        };
    },
    computed: {
        displayedComments () {
            const startIndex = (this.currentPage - 1) * this.commentsPerPage;
            const endIndex = startIndex + this.commentsPerPage;
            return this.comments.slice(startIndex, endIndex);
        },
        totalPages () {
            return Math.ceil(this.comments.length / this.commentsPerPage);
        },
    },
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
