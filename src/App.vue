<template>
  <button @click="inc">Clicked {{ width }} times.</button>
  <button @click="test"> {{map.size}}</button>
  <renderer class="renderer" />
  <stage v-if="initialized" />
 
  <div v-if="initialized">Initialized</div>
</template>

<script>
import { ref, watchEffect, reactive } from 'vue'

import Renderer from "./Renderer.js"
import Stage from "./Stage.js"
import {width, height, renderer, initialized} from "./use/Renderer.js"
import { load, map } from "./use/data.js"

export default {
  components: {
    Renderer, Stage
  },
  setup() {
    // const {width, height} = useRenderer()
    const inc = () => {
      map.value.set(Math.random(), {bla: true})
    }

    const test = () => {
      const a = map.value.get("88368")
      map.value.set("88368", { ...a, bla: Math.random()})
    }

    load('data/data.csv')

    return {
      inc,test,map,
      width,height,initialized
    }
  }
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
.renderer {
  width: 700px;
  height: 700px;
}
</style>
