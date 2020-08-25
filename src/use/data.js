import { ref, shallowRef, watchEffect, markRaw, onMounted, onUnmounted } from 'vue'
import { csv } from 'd3-fetch'

export const map = ref(new Map())
export const keys = ref([])

export async function load(url){
	const dataLoaded = await csv(url)
	// console.log(dataLoaded)
	map.value = new Map(dataLoaded.map(i => [i.id, i]));
	// for(const d of dataLoaded){
	// 	map.value[d.id] = d
	// }
	keys.value = dataLoaded.map(i => i.id);

	console.log(map.value)
}