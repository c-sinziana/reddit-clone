<template>
  <div class="col s12">
    <div class="card post">
      <div class="card-content title-info">
        <span class="card-title vertical-center">
          {{ post.title }}
        </span>
      </div>
      <div
        v-if="isVideo"
        class="card-image waves-effect waves-block waves-light"
      >
        <video class="activator video" controls muted autoplay loop>
          <source type="video/mp4" :src="getVideoUrl" />
        </video>
      </div>
      <div
        v-if="isImage"
        class="card-image waves-effect waves-block waves-light"
      >
        <img class="activator" :src="post.url" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    post: Object,
  },
  setup({ post }) {
    const isVideo = computed(
      () =>
        (post.secure_media && post.secure_media.reddit_video) ||
        post.url.match(/mp4|gifv|mkv|mov|webm$/)
    );
    const isImage = computed(() =>
      post.url.match(/bmp|webp|png|jpg|jpeg|gif$/)
    );
    console.log("Image is", JSON.stringify(post.url));
    const getVideoUrl = computed(() => {
      if (post.secure_media && post.secure_media.reddit_video) {
        return post.media.reddit_video.fallback_url;
      }
      const parts = post.url.split(".");
      parts.pop();
      return parts.concat("mp4").join(".");
    });
    return {
      isVideo,
      isImage,
      getVideoUrl,
    };
  },
};
</script>

<style scoped>
.col {
  display: flex;
  justify-content: center;
}
.post {
  height: 40%;
  width: 80%;
}
.video {
  width: 100%;
}
.title-info {
  padding-bottom: 0px;
}
.score {
  float: none;
}

.vertical-center {
  display: flex;
  align-items: center;
}
</style>
