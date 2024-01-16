import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CanvasBoard from "../components/CanvasBoard.vue"; // コンポーネントのパスを適切に設定
import { postImages } from "../apis/imageApi.js"; // postImages関数のパスを適切に設定
import { nextTick } from "vue";

describe("CanvasBoard", () => {
  let wrapper;

  beforeEach(() => {
    // コンポーネントのマウント
    wrapper = mount(CanvasBoard);
  });

  it("renders a canvas and a button", () => {
    expect(wrapper.find("canvas").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("handles drawing events", async () => {
    // Mock the context of the canvas
    const mockContext = {
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      closePath: vi.fn(),
    };
    HTMLCanvasElement.prototype.getContext = () => mockContext;

    wrapper = mount(CanvasBoard);
    // Find the canvas element in the component
    const canvas = wrapper.find("canvas").element;

    // Set the size of the canvas dynamically
    canvas.width = 500;
    canvas.height = 250;

    // Trigger mousedown event to start drawing
    canvas.dispatchEvent(
      new MouseEvent("mousedown", { clientX: 10, clientY: 10 })
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.drawing).toBe(true);
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.moveTo).toHaveBeenCalledWith(
      10 - wrapper.vm.canvasOffsetX,
      10 - wrapper.vm.canvasOffsetY
    );
  });

  it("sends drawing on button click", async () => {
    // postImagesのモック
    vi.mock("../apis/imageApi.js", () => ({
      postImages: vi.fn(() => Promise.resolve()),
    }));

    const mockCanvas = document.createElement("canvas");
    mockCanvas.getContext = () => ({
      clearRect: vi.fn(),
    });
    mockCanvas.toBlob = (cb) => {
      cb(new Blob());
    };
    wrapper.vm.canvas = mockCanvas;
    wrapper.vm.context = mockCanvas.getContext("2d");

    await wrapper.find("button").trigger("click");
  });

  // Add more tests as needed...
});
