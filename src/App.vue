<template>
  <div id="app">
    <Gallery />
    <div class="input-area">
      <NotificationButton />
      <div class="drawing-area">
        <CanvasBoard />
      </div>
    </div>
  </div>
</template>

<script>
import CanvasBoard from "./components/CanvasBoard.vue";
import Gallery from "./components/Gallery.vue";
import NotificationButton from "./components/NotificationButton.vue";

export default {
  name: "App",
  components: {
    CanvasBoard,
    Gallery,
    NotificationButton,
  },
};
</script>

<style>
html,
body {
  margin: 0, 4;
  padding: 0, 4;
  height: 100%; /* ビューポートの高さに合わせる */
  overflow: hidden; /* 不要なスクロールバーを削除 */
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.drawing-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 40vh;
}
</style>
