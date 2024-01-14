<template>
  <div class="gallery">
    <img v-for="url in imageUrls" :key="url" :src="url" class="image" />
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
    };
  },
  async created() {
    const q = query(
      collection(firestore, "images"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    // Firestoreの更新を監視
    onSnapshot(q, (snapshot) => {
      this.imageUrls = snapshot.docs.map((doc) => doc.data().url);
    });
    // this.imageUrls = await fetchImages();
  },
};
</script>

<style>
.image {
  /* 画像スタイル */
  border: solid;
}
</style>
