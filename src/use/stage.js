import { ref, watch, watchEffect, markRaw, onMounted, onUnmounted, customRef } from 'vue'
import { Container, Sprite, Texture } from "pixi.js"
import { renderer } from "./Renderer.js"
import { xy, coords } from "./projection.js"
import { map } from "./data.js"


export const stage = new Container()
export const sprites = new Map()

// console.log(sprites)
// export const sprites = computed(() => {})


export function useStage() {

	onMounted(() => {

		watchEffect(() => {
			// console.log("stage", map.value)
			console.log("create sprites")
			for(let key of map.value.keys()){
				if(!sprites.get(key)){
					const sprite = new Sprite(Texture.WHITE)
					sprite.scale.x = sprite.scale.y = 0.2
					sprites.set(key, sprite)
					stage.addChild(sprite)
				}
			}
		})

		watchEffect(() => {
			// console.log("set coords")
			for(let [key, value] of coords.value){
				// console.log(value)
				const sprite = sprites.get(key)
				// console.log(value)
				sprite.x = value[0]
				sprite.y = value[1]
				// const c = xy.find(d => d.id === key)
				// s.x = c.x
				// s.y = c.y
				// console.log(c)
			}
		})

		// watch(map, (map, prevMap) => {
		// 	console.log("stage global", map.size, prevMap.size)
		// })
	})

	onUnmounted(() => {
		for(const sprite of sprites.values()){
			sprite.destroy()
		}
		stage.destroy()
		// stage = null
	})

  	return { stage }
}
