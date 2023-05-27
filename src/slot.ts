import anime from 'animejs'
import { Assets, Sprite } from 'pixi.js'

type CreateSlotConfig = {
  path: string
  fromX: number
  fromY: number
  toY: number
  duration: number
  delay: number
}

export async function createSlot(config: CreateSlotConfig) {
  const { path, fromX, fromY, toY, duration, delay } = config

  const texture = await Assets.load(path)
  const sprite = new Sprite(texture)

  sprite.scale.set(0.5)
  sprite.anchor.set(0.5)
  sprite.x = fromX
  sprite.y = fromY

  const animation = anime({
    targets: sprite,
    y: toY - sprite.height / 2,
    duration: duration,
    easing: 'easeOutBounce',
    delay: delay,
  })

  return { sprite, animation }
}
