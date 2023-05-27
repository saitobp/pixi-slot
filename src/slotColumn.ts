import { Application } from 'pixi.js'
import { createSlot } from './slot'

type CreateSlotColumnConfig = {
  app: Application<HTMLCanvasElement>
  x: number
  delay: number
}

export async function createSlotColumn(config: CreateSlotColumnConfig) {
  const { app, x, delay } = config

  const offset = 8

  const slot1 = await createSlot({
    path: 'assets/slot-base-1.png',
    fromX: x,
    fromY: -50,
    toY: app.renderer.height,
    duration: 900,
    delay: delay,
  })

  const slot2 = await createSlot({
    path: 'assets/slot-base-2.png',
    fromX: x,
    fromY: -slot1.sprite.height - offset,
    toY: app.renderer.height - slot1.sprite.height - offset,
    duration: 950,
    delay: delay,
  })

  const slot3 = await createSlot({
    path: 'assets/slot-base-3.png',
    fromX: x,
    fromY: -slot1.sprite.height * 2 - offset * 2,
    toY: app.renderer.height - slot1.sprite.height * 2 - offset * 2,
    duration: 1000,
    delay: delay,
  })

  const slot4 = await createSlot({
    path: 'assets/slot-base-4.png',
    fromX: x,
    fromY: -slot1.sprite.height * 3 - offset * 3,
    toY: app.renderer.height - slot1.sprite.height * 3 - offset * 3,
    duration: 1050,
    delay: delay,
  })

  const slot5 = await createSlot({
    path: 'assets/slot-base-5.png',
    fromX: x,
    fromY: -slot1.sprite.height * 4 - offset * 4,
    toY: app.renderer.height - slot1.sprite.height * 4 - offset * 4,
    duration: 1100,
    delay: delay,
  })

  app.stage.addChild(slot1.sprite)
  app.stage.addChild(slot2.sprite)
  app.stage.addChild(slot3.sprite)
  app.stage.addChild(slot4.sprite)
  app.stage.addChild(slot5.sprite)

  function restart() {
    slot1.animation.restart()
    slot2.animation.restart()
    slot3.animation.restart()
    slot4.animation.restart()
    slot5.animation.restart()
  }

  return { restart }
}
