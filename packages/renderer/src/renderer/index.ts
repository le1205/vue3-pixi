/* eslint-disable @typescript-eslint/ban-ts-comment */
import { noop } from '@antfu/utils'
import {
  BitmapText,
  Container,
  Filter,
  Text,
} from 'pixi.js'
import { createRenderer, warn } from 'vue-demi'
import { isCustomFilter, isExistsEvent } from '../utils'
import { createPixiElement, insertContainer, insertFilter, nextSiblingContainer, nextSiblingFilter } from './options'
import { patchProp } from './patch'

interface CreatePixiRendererOptions {
  prefix?: string
}

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { prefix = 'pixi' } = options

  const renderer = createRenderer<Container, Container>({
    createElement: (name, _, __, props) => {
      const element = isCustomFilter(prefix, name)
        ? props?.is?.(props)
        : createPixiElement(prefix, name, props)

      if (element instanceof Container) {
        element.filters = []
        // @ts-expect-error
        if (isExistsEvent(props) && element.eventMode === 'auto')
        // @ts-expect-error
          element.eventMode = 'static'
      }
      return element
    },

    patchProp,

    parentNode: (node) => {
      return node?.parent
    },
    createText: (text): any => text && new Text(text),
    createComment: noop as any,
    remove: child => child?.destroy(),
    insert: (child, parent, anchor) => {
      if (typeof child === 'string')
        return
      if (child instanceof Filter)
        insertFilter(child, parent, anchor)
      else if (child)
        insertContainer(child, parent, anchor)
    },
    nextSibling: (node) => {
      if (node instanceof Filter)
        return nextSiblingFilter(node)
      else if (node)
        return nextSiblingContainer(node)
    },
    setElementText: (node, text) => {
      text = text.replace(/\\n/g, '\n')
      node instanceof Text || node instanceof BitmapText
        ? node.text = text.trim()
        : warn(`Text is only supported with ${prefix}-text element`)
    },
    setText: (node, text) => {
      text = text.replace('\\n', '\n')
      node instanceof Text || node instanceof BitmapText
        ? node.text = text.trim()
        : warn(`Text is only supported with ${prefix}-text element`)
    },
  })

  return renderer
}

export const { createApp, render } = createPixiRenderer()

export { setObject, setValue, setSkipFirstValue, setPoint } from './setter'
