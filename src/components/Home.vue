<template>
  <div class="home">
    <div v-if="postsState.loading" class="progress orange">
      <div class="indeterminate orange"></div>
    </div>
    <div v-if="postsState.error" class="card red accent-1">
      <div class="card-content white-text">
        <span class="card-title">{{ postsState.error }}</span>
      </div>
    </div>
    <div class="row">
      <RedditPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import usePosts from "../hooks/usePosts";
import { computed } from "vue";
import RedditPost from "./RedditPost.vue";

export default {
  components: {
    RedditPost,
  },
  setup() {
    const postsState = usePosts({ value: "aww" });
    const posts = computed(() => postsState.data.map((child) => child.data));

    return {
      postsState,
      posts,
    };
  },
};
</script>
<style>
s .post {
  height: 100%;
}
.progress {
  width: 50%;
}

.video {
  width: 50%;
}
</style>
