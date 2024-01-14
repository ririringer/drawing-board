<template>
  <canvas
    ref="canvas"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseout="stopDrawing"
    @touchstart="startDrawing"
    @touchmove="draw"
    @touchend="stopDrawing"
  ></canvas>
  <button class="send-button" @click="sendDrawing">送信</button>
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
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.setCanvasSize();
    window.addevtListener("resize", () => this.setCanvasSize());
  },
  beforeUnmount() {
    window.removeevtListener("resize", this.setCanvasSize);
  },
  methods: {
    setCanvasSize() {
      // 実際の表示サイズに基づいてキャンバスサイズを設定
      const style = window.getComputedStyle(this.canvas);
      this.canvas.width = parseInt(style.width, 10);
      this.canvas.height = parseInt(style.height, 10);

      this.context = this.canvas.getContext("2d");
      this.canvasOffsetX = this.canvas.offsetLeft;
      this.canvasOffsetY = this.canvas.offsetTop;
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
      }, "image/png");
    },
  },
};
</script>

<style>
canvas {
  border: solid;
  height: 100%; /* コンテナに合わせて高さを設定 */
  width: calc(100% - 50px); /* コンテナから送信ボタンの幅を引いた幅 */
}

.send-button {
  flex-shrink: 0;
  height: 100%; /* キャンバスと同じ高さ */
  width: 50px; /* 幅は固定 */
}
</style>
