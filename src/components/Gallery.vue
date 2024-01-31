<template>
  <div class="gallery" ref="gallery">
    <v-card v-for="url in imageUrls" class="my-2">
      <img :key="url" :src="url" class="image" @load="onImageLoad" />
    </v-card>
  </div>
</template>

<script>
import { fetchImages } from "../apis/imageApi";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "../config/firebase_config";

export default {
  data() {
    return {
      imageUrls: [],
      gallery: null,
    };
  },
  methods: {
    onImageLoad() {
      this.loadedImages++;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        console.log("scrolled");
        if (this.$refs.gallery) {
          console.log(this.$refs.gallery.scrollHeight);
          this.$refs.gallery.scrollTo(0, this.$refs.gallery.scrollHeight);
        }
      });
    },
  },
  async created() {
    const q = query(
      collection(firestore, "images"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    // Firestoreの更新を監視
    onSnapshot(q, (snapshot) => {
      this.imageUrls = snapshot.docs.map((doc) => doc.data().url).reverse();
      this.loadedImages = 0;
    });
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style>
.gallery {
  flex-grow: 1;
  overflow-y: auto; /* ここでスクロールを許可 */
}
.image {
  /* 画像スタイル */
  width: 100%;
  height: auto;
  max-width: 800px;
}
</style>
