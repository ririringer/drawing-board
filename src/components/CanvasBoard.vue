<template>
  <div class="on-canvas-area">
    <div class="stamp-container">
      <v-avatar
        v-for="stamp in stamps"
        size="50"
        color="white"
        :class="{
          highlight: selectedStamp === stamp,
          'gray-out': selectedStamp !== null && selectedStamp !== stamp,
        }"
        class="mr-2"
      >
        <img
          :src="stamp"
          :alt="'Stamp ' + stamp"
          class="stamp"
          width="40px"
          height="40px"
          @click="selectStamp(stamp)"
        />
      </v-avatar>
    </div>
    <v-btn
      height="50"
      width="100"
      class="send-button"
      @click="sendDrawing"
      color="blue darken 2"
      >送信</v-btn
    >
  </div>
  <div class="canvas-container">
    <v-card height="100%" width="100%">
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
      ></canvas>
    </v-card>
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
      isStampMode: false,
      stamps: [
        "/stamps/flower.png",
        "/stamps/heart.png",
        "/stamps/star.png",
        "/stamps/penguin.png",
      ],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    console.log("this.canvas", this.canvas);
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
      console.log("style.width", style.width);
      console.log("style.height", style.height);
      this.canvas.width = parseInt(style.width, 10);
      this.canvas.height = parseInt(style.height, 10);
      console.log("this.canvas.width", this.canvas.width);
      console.log("this.canvas.height", this.canvas.height);

      this.context = this.canvas.getContext("2d");
      const rect = this.canvas.getBoundingClientRect();
      this.canvasOffsetX = rect.left;
      this.canvasOffsetY = rect.top;
      console.log("this.canvasOffsetX", this.canvasOffsetX);
      console.log("this.canvasOffsetY", this.canvasOffsetY);
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
      // スマホでキャンバスをタッチした時にスクロールすることを防ぐ
      evt.preventDefault();
      // タッチイベントの場合、最初のタッチポイントを取得
      if (evt.touches) evt = evt.touches[0];
      // スタンプモードの場合、スタンプ処理のみ行う
      if (this.isStampMode && this.selectedStamp) {
        this.placeStamp(evt);
        return;
      }
      this.drawing = true;
      console.log("beginpath called");
      console.log(this.context);
      this.context.beginPath();
      const pos = this.getMousePos(this.$refs.canvas, evt);
      console.log("pos.x", pos.x);
      console.log("pos.y", pos.y);
      this.context.moveTo(pos.x, pos.y);
    },
    draw(evt) {
      // スマホでキャンバスを動かした時にスクロールすることを防ぐ
      evt.preventDefault();
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
      if (this.selectedStamp === stamp) {
        // 同じ画像が再選択された場合、線の描画モードに切り替え
        this.isStampMode = false;
        this.selectedStamp = null;
      } else {
        // 新しい画像が選択された場合、その画像を選択状態にし、線の描画を無効に
        this.isStampMode = true;
        this.selectedStamp = stamp;
      }
    },
    placeStamp(evt) {
      const pos = this.getMousePos(this.canvas, evt);
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
      // 画像配置後、状態をリセット
      this.selectedStamp = null;
      this.isStampMode = false;
    },
  },
  dragOverHandler(evt) {
    evt.preventDefault();
  },
};
</script>

<style>
.on-canvas-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  background-color: rgba(173, 216, 230, 0.3);
}

.stamp-container {
  height: 50px;
  min-height: 50px;
}

.stamp {
  cursor: pointer;
}

.canvas-container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 70px);
}

canvas {
  height: 100%;
  width: 100%;
}

.canvas-and-image-color {
  background-color: rgba(173, 216, 230, 0.3);
}

.highlight {
  border: 5px solid yellow;
}

.gray-out {
  opacity: 0.3;
}
</style>
