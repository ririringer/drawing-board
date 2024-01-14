<template>
  <div id="app">
    <div class="gallery">
      <Gallery />
    </div>
    <div class="input-area">
      <UserNameForm />
      <div class="drawing-area">
        <CanvasBoard />
      </div>
    </div>
  </div>
</template>

<script>
import UserNameForm from "./components/UserNameForm.vue";
import CanvasBoard from "./components/CanvasBoard.vue";
import Gallery from "./components/Gallery.vue";

export default {
  name: "App",
  components: {
    UserNameForm,
    CanvasBoard,
    Gallery,
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

.gallery {
  flex-grow: 1;
  overflow-y: auto; /* ここでスクロールを許可 */
}

.drawing-area {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 25vh; /* 画面の下1/4の高さ */
}
</style>
