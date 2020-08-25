import { renderer } from "./use/Renderer.js"
import { ref, watchEffect, markRaw, onMounted, onUnmounted } from 'vue'
import { useStage } from "./use/stage.js"
import { coords } from "./use/projection.js"

export default {
  setup() {
  	console.log("hellor from stage", renderer)

  	const { stage } = useStage()

  	console.log(stage)

  	const loop = () => {
  		requestAnimationFrame(loop)
  		renderer.render(stage)
  		const a = coords.value.get("88368")
  		if(a){
  			coords.value.set("88368", [a[0] + Math.random(), a[1] + Math.random()])
  		}
  	}

  	onMounted(() => {
  		loop()
  	})
  	
  	return () => {}
  }
}