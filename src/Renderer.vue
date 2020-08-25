<template>
  <div ref="wrapperEl">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script>
import { useRenderer } from "./use/Renderer.js"

export default {
  setup(props) {
    const { canvasEl, wrapperEl } = useRenderer()

    return {
      canvasEl, wrapperEl
    }
  }
}
</script>

<style scoped>

</style>
