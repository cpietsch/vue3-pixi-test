import { ref, watchEffect, markRaw, onMounted, onUnmounted, customRef } from 'vue'
import { Renderer } from "pixi.js"

// const _renderer = new Renderer();

export let renderer = null
export const width = useDebouncedRef()
export const height = useDebouncedRef()
export const canvasEl = ref()
export const wrapperEl = ref()
export const initialized = ref(false)

export function createRenderer(){
	console.log("create", renderer)
	renderer = new Renderer({
		view: canvasEl.value,
		width: width.value,
		height: height.value
	})
	initialized.value = true
}

export function useRenderer() {
	const resizeObserver = new ResizeObserver(([entry]) => {
	    width.value = parseInt(entry.contentRect.width)
	    height.value = parseInt(entry.contentRect.height)
	  });

	onMounted(() => {
		console.log("useRenderer onMounted", canvasEl.value)
		resizeObserver.observe(wrapperEl.value);
		createRenderer()

		watchEffect(() => {
			console.log("resize", width.value, height.value)
			renderer.resize(width.value,height.value)
		})
	})

	onUnmounted(() => {
		console.log("useRenderer onUnmounted")
		renderer.destroy()
		renderer = null
		resizeObserver.disconnect()
	})

  	return { wrapperEl, canvasEl }
}

function useDebouncedRef(value, delay = 500) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
