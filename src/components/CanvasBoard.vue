<template>
  <div class="stamp-container">
    <img
      v-for="stamp in stamps"
      :src="stamp"
      :alt="'Stamp ' + stamp"
      class="stamp"
      @mousedown="selectStamp(stamp)"
      draggable="true"
      width="50px"
      height="50px"
    />
  </div>
  <div class="canvas-container">
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseout="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
      @dragover="dragOverHandler"
      @drop="dropStamp"
    ></canvas>
    <button class="send-button" @click="sendDrawing">送信</button>
  </div>
</template>

<script>
import { postImages } from "../apis/imageApi.js";

export default {
  data() {
    return {
      drawing: false,
      context: null,
      canvas: null,
      canvasOffsetX: 0,
      canvasOffsetY: 0,
      selectedStamp: null,
      stamps: [
        "/stamps/flower.png",
        "/stamps/heart.png",
        "/stamps/star.png",
        "/stamps/penguin.png",
        "/stamps/nssol-logo.png",
      ],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.setCanvasSize();
    window.addEventListener("resize", () => this.setCanvasSize());
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setCanvasSize);
  },
  methods: {
    setCanvasSize() {
      console.log("setCaaaa");
      // 実際の表示サイズに基づいてキャンバスサイズを設定
      const style = window.getComputedStyle(this.canvas);
      this.canvas.width = parseInt(style.width, 10);
      this.canvas.height = parseInt(style.height, 10);

      this.context = this.canvas.getContext("2d");
      this.canvasOffsetX = this.canvas.offsetLeft;
      this.canvasOffsetY = this.canvas.offsetTop;
      console.log("this.context");
      console.log(this.context);
    },
    getMousePos(canvas, evt) {
      // イベント座標をキャンバス座標に変換
      return {
        x: evt.clientX - this.canvasOffsetX,
        y: evt.clientY - this.canvasOffsetY,
      };
    },
    startDrawing(evt) {
      // タッチイベントの場合、最初のタッチポイントを取得
      if (evt.touches) evt = evt.touches[0];
      this.drawing = true;
      console.log("beginpath called");
      console.log(this.context);
      this.context.beginPath();
      const pos = this.getMousePos(this.$refs.canvas, evt);
      this.context.moveTo(pos.x, pos.y);
    },
    draw(evt) {
      if (!this.drawing) return;
      if (evt.touches) evt = evt.touches[0];
      const pos = this.getMousePos(this.$refs.canvas, evt);
      this.context.lineTo(pos.x, pos.y);
      this.context.stroke();
    },
    stopDrawing() {
      this.drawing = false;
      this.context.closePath();
    },
    sendDrawing() {
      this.canvas.toBlob(async (blob) => {
        await postImages(blob);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }, "image/png");
    },
    selectStamp(stamp) {
      this.selectedStamp = stamp;
    },
    dropStamp(evt) {
      evt.preventDefault();
      if (!this.selectedStamp) return;
      const pos = this.getMousePos(this.$refs.canvas, evt);
      const image = new Image();
      image.src = this.selectedStamp;
      console.log(this.context);
      image.onload = () => {
        console.log("pos.x", pos.x);
        console.log("pos.y", pos.y);
        console.log(image);
        this.context.drawImage(image, pos.x - 25, pos.y - 25, 50, 50);
      };
      image.onerror = (e) => {
        console.error("Image loading failed:", e);
      };
      this.selectedStamp = null; // スタンプの選択をリセット
    },
    dragOverHandler(evt) {
      evt.preventDefault();
    },
  },
};
</script>

<style>
.stamp-container {
  height: 50px;
  min-height: 50px;
}

.stamp {
  margin-right: 10px;
  cursor: pointer;
}

.canvas-container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 60px);
}

canvas {
  border: solid;
  height: 100%;
  width: calc(100% - 50px); /* コンテナから送信ボタンの幅を引いた幅 */
}

.send-button {
  flex-shrink: 0;
  height: 100%; /* キャンバスと同じ高さ */
  width: 50px; /* 幅は固定 */
}
</style>
