import { mergeConfig, defineConfig } from "vite";
import { JSDOM } from "jsdom";
import viteConfig from "./vite.config";
import { configDefaults } from "vitest/config";
import { fileURLToPath } from "url";

const dom = new JSDOM(
  "<!doctype html><html><body><canvas></canvas></body></html>"
);
global.window = dom.window;
global.document = dom.window.document;

Object.defineProperty(global.window, "navigator", {
  value: {
    userAgent: "node.js",
  },
  writable: true,
});

export default mergeConfig(
  viteConfig,
  defineConfig({
    setupFiles: ["./vitest.setup.js"],
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    threads: false,
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },
  })
);
