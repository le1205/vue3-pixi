<script lang="ts" setup>
import { Sprite } from 'pixi.js'
import type { GraphicsInst } from 'vue3-pixi'

const sprite = Sprite.from('https://pixijs.com/assets/bg_rotate.jpg')
function onDrawRealPath(realPath: GraphicsInst) {
  realPath.lineStyle(2, 0xFFFFFF, 1)
  realPath.moveTo(0, 0)
  realPath.lineTo(100, 200)
  realPath.lineTo(200, 200)
  realPath.lineTo(240, 100)
}
function onDrawBezier(bezier: GraphicsInst) {
  bezier.lineStyle(5, 0xAA0000, 1)
  bezier.bezierCurveTo(100, 200, 200, 200, 240, 100)
}

function onDrawRealPath2(realPath: GraphicsInst) {
  realPath.lineStyle(2, 0xFFFFFF, 1)
  realPath.moveTo(0, 0)
  realPath.lineTo(0, -100)
  realPath.lineTo(150, 150)
  realPath.lineTo(240, 100)
}

function onDrawBezier2(bezier: GraphicsInst) {
  bezier.lineTextureStyle({ width: 10, texture: sprite.texture })
  bezier.bezierCurveTo(0, -100, 150, 150, 240, 100)
}

function onDrawArc(arc: GraphicsInst) {
  arc.lineStyle(5, 0xAA00BB, 1)
  arc.arc(600, 100, 50, Math.PI, 2 * Math.PI)

  arc.lineStyle(6, 0x3333DD, 1)
  arc.arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2)

  arc.lineTextureStyle({ width: 20, texture: sprite.texture })
  arc.arc(650, 420, 60, 2 * Math.PI, 2.5 * Math.PI / 2)
}

function onDrawHole(hole: GraphicsInst) {
  hole.beginFill(0x00FF00)
  hole.drawRect(350, 350, 150, 150)
  hole.beginHole()
  hole.drawCircle(375, 375, 25)
  hole.drawCircle(425, 425, 25)
  hole.drawCircle(475, 475, 25)
  hole.endHole()
  hole.endFill()
}

function onDrawBeatifulRect(beatifulRect: GraphicsInst) {
  beatifulRect.lineTextureStyle({ width: 20, texture: sprite.texture })
  beatifulRect.beginFill(0xFF0000)
  beatifulRect.drawRect(80, 350, 150, 150)
  beatifulRect.endFill()
}
</script>

<template>
  <graphics :x="50" :y="50" @render="onDrawRealPath" />
  <graphics :x="50" :y="50" @render="onDrawBezier" />
  <graphics :x="320" :y="150" @render="onDrawRealPath2" />
  <graphics :x="320" :y="150" @render="onDrawBezier2" />
  <graphics @render="onDrawArc" />
  <graphics @render="onDrawHole" />
  <graphics @render="onDrawBeatifulRect" />
</template>

