<script lang="ts" setup>
import { Ticker } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { SimplePlaneInst } from 'vue3-pixi'

const ticker = new Ticker()
const simplePlaneRef = ref<SimplePlaneInst>()

onMounted(() => {
  const plane = simplePlaneRef.value!
  // Get the buffer for vertice positions.
  const buffer = plane.geometry.getBuffer('aVertexPosition')

  // Listen for animate update
  let timer = 0

  ticker.add(() => {
    // Randomize the vertice positions a bit to create movement.
    for (let i = 0; i < buffer.data.length; i++)
      buffer.data[i] += Math.sin((timer / 10) + i) * 0.5
    buffer.update()
    timer++
  })

  ticker.start()
})

onBeforeUnmount(() => ticker.destroy())
</script>

<template>
  <simple-plane
    ref="simplePlaneRef"
    texture="https://pixijs.com/assets/bg_grass.jpg"
    :vertices-x="10"
    :vertices-y="10"
    :x="0"
    :y="50"
  />
</template>

