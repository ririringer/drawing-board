<template>
  <v-app>
    <v-app-bar app color="blue-darken-2" dark>
      <v-toolbar-title>お絵かき掲示板ver0.1.6</v-toolbar-title>
      <NotificationButton />
    </v-app-bar>
    <v-container class="pa-2 bg-blue-lighten-4">
      <div id="app">
        <Gallery />
        <v-divider></v-divider>
        <div class="input-area" @touchmove.prevent>
          <div class="drawing-area">
            <CanvasBoard />
          </div>
        </div>
      </div>
    </v-container>
  </v-app>
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

// document.addEventListener("DOMContentLoaded", function () {
//   var disableScrollOnDrawingArea = function (e) {
//     // .drawing-area 内での touchmove イベントを検出
//     if (e.target.closest(".drawing-area")) {
//       e.preventDefault();
//     }
//   };

//   // touchmove イベントに対して、条件付きでデフォルト動作を防止
//   document.addEventListener("touchmove", disableScrollOnDrawingArea, {
//     passive: false,
//   });
// });
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
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 40vh;
  overflow: hidden;
}
</style>
