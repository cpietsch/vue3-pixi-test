import { ref, watchEffect, shallowRef, markRaw, computed } from 'vue'
import { map } from "./data.js"
import {width, height} from "./Renderer.js"

export const xy = computed(() => grid(map.value, width.value, height.value))
export const coords = shallowRef(new Map())

function grid(data, width, height){
	const side = Math.ceil(Math.sqrt(data.size))
	const coords = Array.from(data.keys()).map((d,i) => {
		const x = i % side
		const y = parseInt(i/side)
		return { id: d, x: x/side*width, y: y/side*height}
	})
	return coords
}

// watchEffect(() => {
// 	for(let [key, value] of map.value){
// 		console.log(key)
// 		const c = xy.find(d => d.id === key)
// 		s.x = c.x
// 		s.y = c.y
// 		// console.log(c)
// 	}
// })


watchEffect(() => {
	const side = Math.ceil(Math.sqrt(map.value.size))
	console.log("create layout", side)
	let i = 0
	for(let key of map.value.keys()){
		// console.log(key)
		const x = i % side
		const y = parseInt(i/side)
		i++
		coords.value.set(key, [x/side*width.value, y/side*height.value])
	}
})